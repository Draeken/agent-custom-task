var User = require('./user.model');

module.exports = (options) => {
  return (req, res, next) => {
    User.findByToken(req.body.user_token)
      .then(user => res.json({ recipes: user.getRecipes() }))
      .catch(e => next(e));
  }
}
