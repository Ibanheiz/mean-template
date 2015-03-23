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
    when('/mean-seed', {
      templateUrl: 'expose/user/list',
      controller: 'appController'
    }).
    otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
  }]);
})(angular);
