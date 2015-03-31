module.exports = function (express) {
  var router = express.Router();

  router.get('/', function (req, res) {
    res.redirect('/mean-seed/client');
  });

  return router;
};
