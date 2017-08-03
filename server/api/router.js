var router = require('express').Router();

module.exports = (options) => {
  const asOpt = { autoSchedule: options.autoSchedule };
  /**
   * body: { token: token }
   * response: queries: AgentQuery[] || AgentQuery
   */
  router.post('/request', require('./request.controller')(asOpt));

  /**
   * body: { token: token }
   * response: description: string
   */
  router.post('/description/:taskId', require('./description.controller')(asOpt));

  return router;
};
