var router = require('express').Router();
var useragent = require('express-useragent');

module.exports = (options) => {
  const asOpt = { autoSchedule: options.autoSchedule };
  /**
   * body: { temp_token: token }
   *
   */
  router.post('/login', useragent.express(), require('./login.controller')(asOpt));

  /**
   * body: { temp_token: token ; user_token: token }
   * response: OK
   */
  router.post('/register-client', require('./register-client.controller')())

  return router;
};
