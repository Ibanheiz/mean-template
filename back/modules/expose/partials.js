module.exports = function (express) {
  var router = express.Router();

  router.get('/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
  });

  return router;
}