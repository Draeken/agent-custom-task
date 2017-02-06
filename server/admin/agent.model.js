var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var agentSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  url: { type: String, default: '' },
  token: { type: String, default: '' },
  status: { type: String, enum: ['New', 'Verified', 'Disabled'], default: 'New' },
});

module.exports = mongoose.model('Agent', agentSchema);
