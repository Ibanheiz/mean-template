module.exports = function (mongoose, express) {
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
    .get(function (req, res) {
      _client.findAll(req, res, cb);
    })
    .post(function (req, res) {
      _client.save(req, res, cb);
    });

  router.route('/id/:id')
    .get(function (req, res) {
      _client.findOneById(req, res, cb);
    })
    .put(function (req, res) {
      _client.update(req, res, cb);
    })
    .delete(function (req, res) {
      _client.delete(req, res, cb);
    });

  return router;
}
