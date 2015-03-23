
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.UserSchema = new Schema({
  username: {type: String, default: '', require: true},
  email: {type: String, default: '', require: true},
  password: {type: String, default: '', require: true},
  data: { type: Date, default: Date.now }
});
