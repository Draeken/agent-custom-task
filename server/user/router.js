var router = require('express').Router();
var useragent = require('express-useragent');

module.exports = (options) => {
  const asOpt = { autoSchedule: options.autoSchedule };
  /**
   * body: { temp_token: token }
   * response: { token: token }
   */
  router.post('/login', useragent.express(), require('./login.controller')(asOpt));

  /**
   * body: { temp_token: token ; user_token: token }
   * response: OK
   */
  router.post('/register-client', require('./register-client.controller')());

  /**
   * body: { user_token: token }
   * response: { recipes: recipe[] }
   */
  router.post('/request-recipes', require('./request-recipes.controller')());

  /**
   * body: { user_token: token ; recipes: { legacy: Recipe, newRecipe: Recipe }[] }
   * response: { ids: { legacy: id, newId: id }[] }
   */
  router.post('/update-recipes', require('./update-recipes.controller')());

  return router;
};
