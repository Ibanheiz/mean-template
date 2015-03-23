var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../model')(mongoose);
var controller = require('./controller')(User);

router.get('/', function (req, res) {
  console.log('GET para usuários');
});

module.exports = router;
