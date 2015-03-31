module.exports = function (express, passport) {
  var router = express.Router();

  var home = '/mean-seed/client/';

  router.post('/login', passport.authenticate('login', {
    successRedirect: home,
    failureRedirect: '/',
    failureFlash : true
  }));

  router.get('/signup', function (req, res) {
    res.render('register');
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: home,
    failureRedirect: '/signup',
    failureFlash : true
  }));

  router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  return router;
};
