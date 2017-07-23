const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const ACTIVE_RECIPE_STATUS = 0;

const recipeSchema = new Schema({
  recipe: {},
  queries: [{}]
});

const userSchema = new Schema({
  identifier: { type: String },
  recipes: { type: [recipeSchema], default: [] }
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
  return this.recipes.find().select({ queries: 0 }).exec()
    .then(recipes => recipes.map(recipe => Object.assign({}, recipe.recipe, { id: recipe._id })));
}

function computeQuery(recipe, recipeList, notifier) {
  if (recipe.recipe.status !== ACTIVE_RECIPE_STATUS) { recipe.queries = []; return; }
  // TODO: Handle recurrence, time restriction & links
  recipe.queries = [];
  recipe.queries.push({
    taskIdentity: { id: new mongoose.Types.ObjectId },
    transform: {},
    autoterminate: true,
    notifyWhenDone: false,
    dontColide: false,
    atomic: Object.assign({}, recipe.atomic)
  });
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
  this.recipes.forEach(recipe => {
    if (!recipe.isModified('recipe')) { return; }
    computeQuery(recipe, this.recipe, notifier);
    notifier.notify(recipe);
  });
  next();
});

recipeSchema.pre('save', function(next) {
  if (!this.isModified()) { return next(); }
  const user = this.ownerDocument();
  user.recipes.forEach(recipe => {
    if (!recipe.recipe.links.find(link => link.recipeId == this.recipe.id)) { return; }
    recipe.markModified('recipe');
  })
  this.queries = [];
  this.recipe.id = this._id;
  next();
})

recipeSchema.post('remove', function (removedRecipe) {
  const user = removedRecipe.ownerDocument();
  user.recipes.forEach(recipe => {
    const cleanedLinks = recipe.recipe.links.filter(link => link.recipeId != removedRecipe.recipe.id);
    if (cleanedLinks.length === recipe.recipe.links.length) { return; }
    recipe.recipe.links = cleanedLinks;
    recipe.markModified('recipe.links');
  })
});

module.exports = mongoose.model('User', userSchema);
