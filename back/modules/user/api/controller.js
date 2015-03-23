module.exports = function (User) {
  return {
    get: function(req, res, cb) {
      var model = new User();
      model.username = 'nico';
      console.log(model)
    }
  }
}