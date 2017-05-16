var http = require('http');
var helper = require('./helper');

function computeDescription() {
  return new Promise((resolve, reject) => {
    let desc = 'My Description';
    resolve(desc);
  });
}

module.exports = (options) => {
  return (req, res, next) => {
    helper.retrieveUser(req.body.token, options.autoSchedule)
      .then(user => computeDescription())
      .then(desc => res.json({ description: desc }))
      .catch(err => next(err));
  }
}
