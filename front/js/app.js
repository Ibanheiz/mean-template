(function(angular){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services',
    'ngRoute',
    'ngSanitize'
    ]).
  config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/mean-seed/client', {
      templateUrl: 'expose/client/list',
      controller: 'ClientListController'
    }).
    when('/mean-seed/client/create', {
      templateUrl: 'expose/client/create',
      controller: 'ClientCreateController'
    }).
    when('/mean-seed/client/:id/edit', {
      templateUrl: 'expose/client/edit',
      controller: 'ClientEditController'
    }).
    when('/mean-seed/client/:id/remove', {
      templateUrl: 'expose/client/edit',
      controller: 'ClientRemoveController'
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
