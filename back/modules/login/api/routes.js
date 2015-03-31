module.exports = function (express, passport) {
  var router = express.Router();

  function cb(user, info, req, res) {
    var data = {
      user: user,
      message: info ? info.message : ''
    };
    req.logIn(user, function (err) {
      if (err) {
        data.err = err;
      }
      console.log(data);
      return res.json(data);
    });
  }

  router.post('/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      cb(user, info, req, res);
    })(req, res, next);
  });

  router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', function (err, user, info) {
      cb(user, info, req, res);
    })(req, res, next);
  });

  router.get('/signout', function (req, res) {
    req.logout();
    res.json('Encerrando a sessão do usuário');
  });

  router.get('/loggedin', function (req, res) {
    console.log('Usuário autenticado: ' + req.isAuthenticated());
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  return router;
};
