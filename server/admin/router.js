var router = require('express').Router();

module.exports = (options) => {
  router.post('/register-agent', require('./register-agent.controller')({ autoSchedule: options.autoSchedule }));

  return router;
};
