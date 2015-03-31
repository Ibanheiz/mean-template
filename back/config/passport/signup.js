module.exports = function (passport, User) {
  var LocalStrategy   = require('passport-local').Strategy;
  var bCrypt = require('bcrypt-nodejs');

  // Generates hash using bCrypt
  var createHash = function (password) {
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
        // Busca pelo usuário
        User.findOne({ 'username' :  username }, function (err, user) {
          // Se houver um erro ao buscar o usuário
          if (err) {
            console.log('Error no Signup: ' + err);
            return done(err);
          }

          if (user) {
            console.log('Já existe o usuário: ' + username);
            return done(null, false, req.flash('message', 'O usuário já existe'));
          } else {
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = email;

            // save the user
            newUser.save(function (err) {
              if (err) {
                console.log('Erro ao salvar um novo usuário: ' + err);
                throw err;
              }
              return done(null, newUser, req.flash('message', 'Usuário cadastrado com sucesso'));
            });
          }
        });
      };
      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    })
    );
};