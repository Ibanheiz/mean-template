module.exports = function (mongoose, router) {
  var User = require('./../model')(mongoose);
  var controller = require('./controller')(User);

  router.get('/', function (req, res) {
    console.log('GET para usuários');
  });

  return router;
}