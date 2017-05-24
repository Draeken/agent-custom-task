var http = require('http');
var tempTokenHash = require('./temp-token.hash');
var helper = require('../api/helper');
var jwt = require('jsonwebtoken');

function minimizeUserAgent(ua) {
  return JSON.stringify(Object.keys(ua)
               .filter(key => ua[key] !== false)
               .reduce((res, key) => (res[key] = ua[key], res), {}));
}

function computePayload(req) {
  return new Promise((resolve, reject) => {
    const userTokenPayload = tempTokenHash[req.body.temp_token];
    if (!userTokenPayload || typeof userTokenPayload.userToken !== "string") {
      const error = {
        token: req.body.temp_token,
        result: tempTokenHash[req.body.temp_token],
        message: "Invalid userToken type (should be string)"
      };
      reject(error);
    }
    delete tempTokenHash[req.body.temp_token];
    const now = Date.now();
    const fiveMin = 5 * 60 * 1000;
    if (now - userTokenPayload.iat > fiveMin) {
      reject('Token too old.');
    }
    const ua = minimizeUserAgent(req.useragent);
    return resolve({
      userAgent: ua,
      ip: req.ip,
      token: userTokenPayload.userToken
    });
  })
}

function computeToken(user) {
  const payload = {
    userId: user._id
  };
  // Could add device like AutoSchedule server.
  return jwt.sign(payload, require('./secret').token.client);
}

module.exports = (options) => {
  return (req, res, next) => {
    computePayload(req)
      .then(payload => helper.retrieveUser(payload.token, options.autoSchedule))
      .then(computeToken)
      .then(token => res.json({ token: token }))
      .catch(err => next(err));
  }
}
