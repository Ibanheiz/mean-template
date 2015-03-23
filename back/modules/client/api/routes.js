module.exports = function (mongoose, router) {
  var Client = require('./../model')(mongoose);
  var controller = require('./controller')(Client);

  router.get('/', function (req, res) {
    console.log('GET para clientes');
  });

  return router;
}
