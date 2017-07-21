const mongoose = require('mongoose');
const User = require('./user.model');
const NEW_RECIPE_STATUS = 3;

function mergeNewRecipe(userRecipe, newRecipe) {
  Object.assign(userRecipe.recipe, newRecipe);
  userRecipe.recipe.id = userRecipe._id;
  userRecipe.queries = computeQueries(userRecipe.recipe);
  return userRecipe;
}

function computeQueries(recipe) {
  const queries = [];
  const query = {
    taskIdentity: { id: new mongoose.Types.ObjectId },
    transform: {},
    autoterminate: true,
    notifyWhenDone: false,
    dontColide: false,
    atomic: Object.assign({}, recipe.atomic)
  }
}

// recipes: { legacy: Recipe, newRecipe: Recipe }[]
function updateRecipes(user, changes) {
  const idsMap = changes.map(change => {
    const legacy = change.legacy;
    const newRecipe = change.newRecipe;
    let userRecipe;
    if (legacy.status !== NEW_RECIPE_STATUS) {
      userRecipe = user.recipes.id(legacy.id);
    } else {
      user.recipes.push({ recipe: {}, queries: [] });
      userRecipe = user.recipes[user.recipes.length - 1];
    }
    if (newRecipe) {
      mergeNewRecipe(userRecipe, newRecipe);
    } else {
      userRecipe.remove();
    }
    return { legacy: legacy.id, newId: newRecipe }
  });
  return user.save().then(() => idsMap);
}

module.exports = (options) => {
  return (req, res, next) => {
    User.findByToken(req.body.user_token)
      .then(user => updateRecipes(user, req.body.recipes))
      .then(idsMap => res.json({ ids: idsMap }))
      .catch(e => next(e));
  }
}
