module.exports = function (mongoose, express, authenticate) {
  var router = express.Router();
  var Client = require('./../model')(mongoose);
  var _client = require('./controller')(Client);

  var cb = function(err, data, res){
    var msg = data;
    if (err){
      msg = '{Erro no módulo de Clientes: ' + err + '}';
    }
    res.json(msg);
  }

  router.route('/')
    .get(authenticate, function (req, res) {
      _client.findAll(req, res, cb);
    })
    .post(authenticate, function (req, res) {
      _client.save(req, res, cb);
    });

  router.route('/id/:id')
    .get(authenticate, function (req, res) {
      _client.findOneById(req, res, cb);
    })
    .put(authenticate, function (req, res) {
      _client.update(req, res, cb);
    })
    .delete(authenticate, function (req, res) {
      _client.remove(req, res, cb);
    });

  return router;
}
