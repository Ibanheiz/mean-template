var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Client = require('./../model')(mongoose);
var controller = require('./controller')(Client);

router.get('/', function (req, res) {
  console.log('GET para clientes');
});

module.exports = router;
