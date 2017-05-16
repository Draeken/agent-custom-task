var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('trust proxy');
app.use(morgan('combined'));

module.exports = (options) => {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `${options.test.server.ip}${options.test.server.port}`);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.options((req, res) => res.sendStatus(200));

  app.post('*', bodyParser.json());

  app.use('/admin', require('./admin/router.js')({ autoSchedule: options.autoSchedule }));
  app.use('/api', require('./api/router.js')({ autoSchedule: options.autoSchedule }));

  app.use((req, res) => res.sendStatus(404));

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    console.error(err);
    res.sendStatus(500);
  });

  return app;
}
