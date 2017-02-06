var http = require('http');

var Agent = require('./agent.model');

function initAgent() {
  return Agent.findOne().exec()
    .then(agent => {
      if (agent) { return agent; }
      agent = new Agent(require('./agent.config'));
      return agent.save();
    })
}

function askForToken(agent, asConfig) {
  return new Promise((resolve, reject) => {
    let req = http.request({
      host: asConfig.ip,
      port: asConfig.port,
      path: '/agent/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, res => {
      if (res.statusCode !== 200) { return reject(`Status code: ${res.statusCode}.`)};
      let bodyChunks = [];
      res.on('data', chunk => bodyChunks.push(chunk));
      res.on('end', () => resolve(JSON.parse(Buffer.concat(bodyChunks)).token));
    });
    req.on('error', e => reject(e));
    req.write(JSON.stringify({ agent: agent }));
    req.end();
  }).then(token => {
    agent.token = token;
    return agent.save();
  });
}

module.exports = (options) => {
  return (req, res, next) => {
    initAgent()
      .then(agent => askForToken(agent, options.autoSchedule))
      .then(agent => res.json({ agent: agent }))
      .catch(err => next(err));
  }
}
