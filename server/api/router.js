var router = require('express').Router();

module.exports = (options) => {
  /**
   * body: { token: token }
   * response: request: AgentQuery[] || AgentQuery
   */
  router.post('/request', require('./request.controller')({ autoSchedule: options.autoSchedule }));

  /**
   * body: { token: token }
   * response: description: string
   */
  router.post('/description/:taskId', require('./description.controller')({ autoSchedule: options.autoSchedule }));

  return router;
};
