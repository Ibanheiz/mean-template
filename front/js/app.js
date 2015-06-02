(function (angular) {
  'use strict';

  function checkUser($q, $http, cb) {
    // Inicializa a promisse
    var deferred = $q.defer();
    // Verifica se existe um usuário autenticado
    $http.get('/api/login/loggedin').success(function (user) {
      cb(deferred, user);
    });
    return deferred.promise;
  }
  var auth = {
    checkLoggedin: ['$q', '$http', '$location', function ($q, $http, $location) {
      checkUser($q, $http, function (deferred, user) {
        if (user !== '0') {
          deferred.resolve();
        } else {
          deferred.reject();
          $location.url('/mean-seed/login');
        }
      });
    }],
    checkLoggedOut: ['$q', '$http', '$location', function ($q, $http, $location) {
      checkUser($q, $http, function (deferred, user) {
        if (user !== '0') {
          deferred.reject();
          $location.url('/mean-seed/client');
        } else {
          deferred.resolve();
        }
      });
    }]
  };

  function routerConfig($routeProvider, $locationProvider) {
    $routeProvider.
      when('/mean-seed/login', {
        templateUrl: 'expose/login/login',
        controller: 'LoginController',
        resolve: {
          loggedin: auth.checkLoggedOut
        }
      }).
      when('/mean-seed/signup', {
        templateUrl: 'expose/login/signup',
        controller: 'SignupController',
        resolve: {
          loggedin: auth.checkLoggedOut
        }
      }).
      when('/mean-seed/client', {
        templateUrl: 'expose/client/list',
        controller: 'ClientListController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when('/mean-seed/client/create', {
        templateUrl: 'expose/client/save',
        controller: 'ClientCreateController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when('/mean-seed/client/:id/edit', {
        templateUrl: 'expose/client/save',
        controller: 'ClientEditController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when('/mean-seed/client/:id/remove', {
        templateUrl: 'expose/client/edit',
        controller: 'ClientRemoveController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when('/mean-seed/user', {
        templateUrl: 'expose/user/list',
        controller: 'UserController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when('/mean-seed/404', {
        templateUrl: 'expose/main/404',
        controller: 'UserController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      otherwise({
        redirectTo: '/mean-seed/404'
      });
    $locationProvider.html5Mode(true);
  }

  routerConfig.$inject = ['$routeProvider', '$locationProvider'];

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services',
    'ngSanitize',
    'ngRoute',
    'ngResource',
    'ngAnimate'
  ])
    .config(routerConfig);
}(angular));

