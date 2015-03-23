(function(angular){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters',
    'ngRoute',
    'ngSanitize'
    ]).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/mean-seed/client', {
      templateUrl: 'expose/client/list',
      controller: 'ClientController'
    }).
    when('/mean-seed/user', {
      templateUrl: 'expose/user/list',
      controller: 'UserController'
    }).
    otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]);
})(angular);
