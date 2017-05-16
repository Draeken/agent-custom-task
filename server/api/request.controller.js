var http = require('http');
var helper = require('./helper');

function computeRequest() {
  return new Promise((resolve, reject) => {
    let request = {
      taskIdentity: {
        id: 1
      },
      transform: {

      },
      atomic: {
        duration: {
          min: 5000,
          max: 100000
        }
      }
    };
    resolve(request);
  });
}

module.exports = (options) => {
  return (req, res, next) => {
    helper.retrieveUser(req.body.token, options.autoSchedule)
      .then(user => computeRequest())
      .then(request => res.json({ request: request }))
      .catch(err => next(err));
  }
}
