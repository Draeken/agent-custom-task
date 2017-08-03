const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const ACTIVE_RECIPE_STATUS = 1;

const recipeInfoSchema = new Schema({
  recipe: {},
  queries: [{}]
});

const userSchema = new Schema({
  identifier: { type: String },
  recipeInfos: { type: [recipeInfoSchema], default: [] }
});

userSchema.statics.findOrCreate = function(userId) {
  return this.findOne({ 'identifier': userId }).exec()
    .then(user => {
      return new Promise((resolve, reject) => {
        if (!user) {
          mongoose.model('User').create({ identifier: userId }).exec().then(resolve).catch(reject);
        }
        resolve(user);
      });
    });
}

userSchema.statics.findByToken = function(token) {
  let payload = jwt.verify(token, require('./secret').token.client);
  return this.findById(payload.userId).exec().then(user => {
    if (!user) { throw new Error(`User ${payload.userId} not found.`); }
    return user;
  });
}

userSchema.methods.getRecipes = function() {
  return this.recipeInfos.map(recipeInfo => Object.assign({}, recipeInfo.recipe, { id: recipeInfo._id }));
}

function computeQuery(recipeInfo, recipeInfoList, notifier) {
  if (recipeInfo.recipe.status !== ACTIVE_RECIPE_STATUS) { recipeInfo.queries = []; return; }
  // TODO: Handle links
  recipeInfo.queries = [];
  recipeInfo.queries.push({
    taskIdentity: { id: new mongoose.Types.ObjectId },
    transform: {},
    autoterminate: true,
    notifyWhenDone: timeBoundaryNotEmpty(recipeInfo.recipe.recurrence),
    dontColide: false,
    atomic: Object.assign({}, recipeInfo.recipe.atomic)
  });
}

function timeBoundaryNotEmpty(timeBoundary) {
  return timeBoundary.target != null || timeBoundary.min != null || timeBoundary.max != null;
}

function notifierFactory() {
  const subscribers = [];
  return {
    register: (callback) => {
      subscribers.push(callback);
    },
    unregister: (callback) => {
      const i = subscribers.findIndex(s => s === callback);
      if (i === -1) { return false; }
      subscribers.splice(i, 1);
      return true;
    },
    notify: (data) => {
      subscribers.forEach(cb => cb(data));
    }
  };
}

userSchema.pre('save', function(next) {
  const notifier = notifierFactory();
  this.recipeInfos.forEach(recipeInfo => {
    if (!recipeInfo.isModified('recipe')) { return; }
    computeQuery(recipeInfo, this.recipeInfos, notifier);
    notifier.notify(recipeInfo);
  });
  next();
});

recipeInfoSchema.pre('save', function(next) {
  if (!this.isModified()) { return next(); }
  const user = this.ownerDocument();
  user.recipeInfos.forEach(recipeInfo => {
    if (!recipeInfo.recipe.links.find(link => link.recipeId == this.recipe.id)) { return; }
    recipe.markModified('recipe');
  })
  this.queries = [];
  this.recipe.id = this._id;
  next();
})

recipeInfoSchema.post('remove', function (removedRecipe) {
  const user = removedRecipe.ownerDocument();
  user.recipeInfos.forEach(recipeInfo => {
    const cleanedLinks = recipeInfo.recipe.links.filter(link => link.recipeId != removedRecipe.recipe.id);
    if (cleanedLinks.length === recipeInfo.recipe.links.length) { return; }
    recipeInfo.recipe.links = cleanedLinks;
    recipeInfo.markModified('recipe.links');
  })
});

module.exports = mongoose.model('User', userSchema);
