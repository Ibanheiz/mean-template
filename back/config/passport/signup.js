module.exports = function (passport, User) {
  var LocalStrategy   = require('passport-local').Strategy;
  var bCrypt = require('bcrypt-nodejs');

  var criptografar = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
    function (req, username, password, done) {
      username = req.body.username;
      password = req.body.password;
      var email = req.body.email;
      var findOrCreateUser = function () {
        User.findOne({ 'username' :  username }, function (err, user) {
          if (err) {
            console.log('Error no Signup: ' + err);
            return done(err);
          }
          if (user) {
            console.log('Já existe o usuário: ' + username);
            return done(null, false, {message: 'O usuário já existe'});
          }
          var newUser = new User();
          newUser.username = username;
          newUser.password = criptografar(password);
          newUser.email = email;

          newUser.save(function (err) {
            if (err) {
              console.log('Erro ao salvar um novo usuário: ' + err);
              throw err;
            }
            return done(null, newUser, {message: 'Usuário cadastrado com sucesso'});
          });
        });
      };
      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
    );
};