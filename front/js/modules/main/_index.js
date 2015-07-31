'use strict';

var angular           = require('angular');
var bulk              = require('bulk-require');

var loginModules = [
  'app.Main.controllers',
  'app.Main.factories',
  'app.Main.directives'
];

module.exports = angular.module('app.Main', loginModules);

bulk(__dirname, ['./**/!(*_index|*.spec).js']);
