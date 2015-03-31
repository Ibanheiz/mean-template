module.exports = function (passport, mongoose) {
  var login = require('./login');
  var signup = require('./signup');
  var User = require('../../modules/user/model')(mongoose);

  passport.serializeUser(function (user, done) {
    console.log('# Serializing user: ' + user.username);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('# Deserializing user:', user.username);
      done(err, user);
    });
  });

  login(passport, User);
  signup(passport, User);
};