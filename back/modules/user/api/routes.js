module.exports = function (mongoose, express) {
  var router = express.Router();
  var User = require('./../model')(mongoose);
  var _user = require('./controller')(User);

  router.get('/', function (req, res) {
    console.log('GET para usuários');
  });

  return router;
}