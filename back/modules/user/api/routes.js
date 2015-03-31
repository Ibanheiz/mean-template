module.exports = function (express) {
  var router = express.Router();
  var User = require('./../model');
  var _user = require('./controller')(User);

  router.get('/', function (req, res) {
    console.log('GET para usuários');
  });

  return router;
}