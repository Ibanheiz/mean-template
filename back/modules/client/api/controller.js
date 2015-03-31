module.exports = function (Client) {
  return {
    findAll: function (req, res, cb) {
      var query = {};
      Client.find(query, function (err, data) {
        cb(err, data, res);
      });
    },
    findOneById: function (req, res, cb) {
      var id = req.params.id;
      var query = {_id: id};
      Client.findOne(query, function (err, data) {
        cb(err, data, res);
      });
    },
    save: function (req, res, cb) {
      var dados = req.body;
      var model = new Client(dados);
      model.save(function (err, data) {
        cb(err, data, res);
      });
    },
    update: function (req, res, cb) {
      var id = req.params.id;
      var query = {_id: id};
      var mod = req.body;
      delete mod._id;
      Client.update(query, mod, function (err, data) {
        cb(err, data, res);
      });
    },
    remove: function (req, res, cb) {
      var id = req.params.id;
      var query = {_id: id};
      Client.remove(query, function (err, data) {
        cb(err, data, res);
      });
    }
  };
};