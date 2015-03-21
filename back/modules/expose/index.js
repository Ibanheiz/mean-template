var express = require('express');
var router = express.Router();

router.get('/:module/:name', function(req, res) {
	var module = req.params.module;
	var name = req.params.name;
  console.log('View: ' + module + '/views/' + name);
	res.render(module + '/views/' + name);
});

module.exports = router;