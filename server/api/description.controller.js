var http = require('http');
var helper = require('./helper');

function computeDescription(user, recipeId) {
  return user.recipeInfos.id(recipeId).recipe.description;
}

module.exports = (options) => {
  return (req, res, next) => {
    helper.retrieveUser(req.body.token, options.autoSchedule)
      .then(user => computeDescription(user, req.param.id))
      .then(desc => res.json({ description: desc }))
      .catch(err => next(err));
  }
}
