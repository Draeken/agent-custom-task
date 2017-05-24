var http = require('http');
var tempTokenHash = require('./temp-token.hash');

var entryThreshold = 10000;

function cleanOldToken() {
  const now = Date.now();
  const fiveMin = 5 * 60 * 1000;

  for (var prop in entryThreshold) {
    const value = entryThreshold[prop];
    if (now - value.iat > fiveMin) {
      delete entryThreshold[prop];
    }
  }
}

function saveTempToken(tempToken, userToken) {
  return new Promise((resolve, reject) => {
    try {
      const hashEntry = {
        userToken: userToken,
        iat: Date.now()
      }
      if (tempTokenHash[tempToken]) { return reject('token already exist'); }
      tempTokenHash[tempToken] = hashEntry;
      if (Object.keys(tempTokenHash).length > entryThreshold) { cleanOldToken(); }
    } catch (e) {
      reject(e);
    }
    resolve();
  })
}

module.exports = (options) => {
  return (req, res, next) => {
    saveTempToken(req.body.temp_token, req.body.user_token)
      .then(() => res.sendStatus(200))
      .catch(err => next(err));
  }
}
