'use strict';

var angular = require('angular');

// modules
require('./modules/login/_index')
require('angular-route');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('angular-animate');

var requires = [
  'app.login',
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'ngCookies',
  'ngResource'
];

angular.module('app', requires);
angular.module('app').config(require('./systemConfig'));
angular.module('app').run(require('./systemRun'));
angular.module('app').constant('SystemUriConfig', require('./systemConstants'));