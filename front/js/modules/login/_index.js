'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');
var loginModules = [
  'app.Login.controllers',
  'app.Login.services',
  'app.Login.factories'
];

module.exports = angular.module('app.Login', loginModules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
