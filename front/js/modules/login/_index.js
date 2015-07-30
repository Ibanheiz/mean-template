'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');
var loginModules = [
  'app.login.controllers',
  'app.login.services'
];

module.exports = angular.module('app.login', loginModules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
