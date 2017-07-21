var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  identifier: { type: String },
  recipes: {
    type: [new Schema({
      recipe: {},
      queries: [new Schema({
        id: { type: Number }
      }, { _id: false })]
    })], default: []
  }
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

module.exports = mongoose.model('User', userSchema);
