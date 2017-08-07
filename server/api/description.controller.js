var http = require('http');
var helper = require('./helper');

function computeDescription(user, recipeId) {
  return user.recipeInfos
    .find(recipeInf => recipeInf.queries.some(q => q.taskIdentity.id == recipeId))
    .recipe.description;
}

module.exports = (options) => {
  return (req, res, next) => {
    helper.retrieveUser(req.body.token, options.autoSchedule)
      .then(user => computeDescription(user, req.params.taskId))
      .then(desc => res.json({ description: desc }))
      .catch(err => next(err));
  }
}
