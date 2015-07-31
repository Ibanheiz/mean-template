'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');
var loginModules = [
  'app.Client.controllers',
  'app.Client.services',
  'app.Client.factories'
];

module.exports = angular.module('app.Client', loginModules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
