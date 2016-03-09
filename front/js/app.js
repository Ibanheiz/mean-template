'use strict';

var angular = require('angular');

// modules
require('./modules/main/_index');
require('./modules/login/_index');
require('./modules/client/_index');
require('angular-route');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('angular-animate');
require('mask/dist/ngMask.min');

var requires = [
  'app.Main',
  'app.Login',
  'app.Client',
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'ngCookies',
  'ngMask',
  'ngResource'
];

angular.module('app', requires);
angular.module('app').config(require('./systemConfig'));
angular.module('app').run(require('./systemRun'));
angular.module('app').constant('SystemUriConfig', require('./systemConstants'));
