module.exports = function (mongoose, express) {
  var router = express.Router();
  var Client = require('./../model')(mongoose);
  var controller = require('./controller')(Client);

  var cb = function(err, data, res){
    if (err){
      msg = '{Erro: ' + err +'}' ;
    }
    else{
      msg = data;
    }
    console.log(msg);
    res.json(msg);
  }

  router.get('/', function (req, res) {
    controller.findAll(req, res, cb);
  });

  return router;
}
