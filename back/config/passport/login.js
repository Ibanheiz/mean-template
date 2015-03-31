module.exports = function (passport, User) {
  var LocalStrategy   = require('passport-local').Strategy;
  var bCrypt = require('bcrypt-nodejs');

  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use('login', new LocalStrategy({passReqToCallback: true},
    function (req, username, password, done) {
      username = req.body.username;
      User.findOne({ 'username' :  username },
        function (err, user) {
          if (err) {
            console.log('Erro ao buscar usuário no login' + err);
            return done(err);
          }
          if (!user) {
            console.log('Usuário não encontrado ' + username);
            return done(null, false, req.flash('message', 'Usuário não encontrado'));
          }
          if (!isValidPassword(user, password)) {
            console.log('Senha inválida');
            return done(null, false, req.flash('message', 'Senha inválida'));
          }
          console.log('Logado com sucesso');
          return done(null, user);
        }
        );
    })
    );

};