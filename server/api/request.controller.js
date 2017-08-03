var http = require('http');
var helper = require('./helper');

function computeRequest(user) {
  return user.recipeInfos.map(recipeInfo => recipeInfo.queries).reduce((a, b) => a.concat(b));
}

module.exports = (options) => {
  return (req, res, next) => {
    helper.retrieveUser(req.body.token, options.autoSchedule)
      .then(user => computeRequest(user))
      .then(queries => res.json({ queries: queries }))
      .catch(err => next(err));
  }
}
