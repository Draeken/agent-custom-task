var config = require('./server/config');
var mongoose = require('mongoose');

mongoose.connect(`mongodb://${config.test.db.ip}/${config.test.db.name}`);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log(`connected to DB ${config.test.db.ip}/${config.test.db.name}`);
});

var app = require('./server/index')({
  test: config.test,
  autoSchedule: config.test.autoSchedule,
});

app.listen(config.test.express.port, config.test.express.ip, function (error) {
  if (error) {
    console.error('Unable to listen for connections', error);
    process.exit(10);
  }
  console.info(`express is listening on http://${config.test.express.ip}:${config.test.express.port}`);
})

require('./server/user/user.model.test');
