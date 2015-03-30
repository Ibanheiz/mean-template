module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log('Próxima rota: ' + next());
    return next();
  }
  console.log('Redirecionando pro login');
  res.redirect('/mean-seed/login');
};