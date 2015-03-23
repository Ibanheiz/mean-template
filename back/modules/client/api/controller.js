module.exports = function (Client) {
  return {
    teste: function(req, res, cb) {
      var model = new Client();
      model.razaoSocial = 'Nicolas SA';
      console.log(model)
    }
  }
}