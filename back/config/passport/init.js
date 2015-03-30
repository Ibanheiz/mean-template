module.exports = function (passport) {
  var login = require('./login');
  var signup = require('./signup');
  var User = require('../../modules/user/model');

  passport.serializeUser(function (user, done) {
    console.log('serializing user: ');
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('deserializing user:', user);
      done(err, user);
    });
  });

  login(passport);
  signup(passport);
};