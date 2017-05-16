var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  identifier: { type: String }
});

userSchema.statics.findOrCreate = function(userId) {
  return this.findOne({ 'identifier': userId }).exec()
    .then(user => {
      return new Promise((resolve, reject) => {
        if (!user) {
          mongoose.model('User').create({ identifier: userId }).exec().then(resolve).catch(reject);
        }
        resolve(user);
      });
    });
}

module.exports = mongoose.model('User', userSchema);
