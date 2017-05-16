var jwt = require('jsonwebtoken');
var http = require('http');
var Agent = require('../admin/agent.model');
var User = require('../user/user.model');

exports.retrieveUser = (userToken, asConfig) => {
  return Agent.findOne().select('-_id token').exec()
    .then(agent => {
    return new Promise((resolve, reject) => {
      let req = http.request({
        host: asConfig.ip,
        port: asConfig.port,
        path: '/agent/retrieve-user',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, res => {
        if (res.statusCode !== 200) { return reject(`Retrieve user error: Status code: ${res.statusCode}.`)};
        let bodyChunks = [];
        res.on('data', chunk => bodyChunks.push(chunk));
        res.on('end', () => resolve(JSON.parse(Buffer.concat(bodyChunks)).userId));
      });
      req.on('error', e => { reject(e); });
      req.write(JSON.stringify({
        userToken: userToken,
        agentToken: agent.token
      }));
      req.end();
    })
  }).then(userId => {
    return User.findOrCreate(userId);
  });
}
