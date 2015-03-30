module.exports = function (passport) {
  var LocalStrategy   = require('passport-local').Strategy;
  var User = require('../../modules/user/model');
  var bCrypt = require('bcrypt-nodejs');

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use('login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.findOne({ 'username' :  username },
        function (err, user) {
          // In case of any error, return using the done method
          if (err) {
            return done(err);
          }
          // Username does not exist, log the error and redirect back
          if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false, req.flash('message', 'User Not found.'));
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false);
          }
          return done(null, user);
        }
        );
    })
    );

};