var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  var name = req.params.name;
  console.log('Partials: partials/' + name);
  res.render('partials/' + name);
});

module.exports = router;