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
    checkLoggedin: ['$q', '$http', '$location', 'systemUri', function ($q, $http, $location, systemUri) {
      checkUser($q, $http, function (deferred, user) {
        if (user !== '0') {
          deferred.resolve();
        } else {
          deferred.reject();
          $location.url(systemUri.getLogin());
        }
      });
    }],
    checkLoggedOut: ['$q', '$http', '$location', 'systemUri', function ($q, $http, $location, systemUri) {
      checkUser($q, $http, function (deferred, user) {
        if (user !== '0') {
          deferred.reject();
          $location.url(systemUri.getHome());
        } else {
          deferred.resolve();
        }
      });
    }]
  };

  function routerConfig($routeProvider, $locationProvider, systemUriConfig) {
    $routeProvider.
      when(systemUriConfig.getLogin, {
        templateUrl: 'expose/login/login',
        controller: 'LoginController',
        resolve: {
          loggedin: auth.checkLoggedOut
        }
      }).
      when(systemUriConfig.getSignup, {
        templateUrl: 'expose/login/signup',
        controller: 'SignupController',
        resolve: {
          loggedin: auth.checkLoggedOut
        }
      }).
      when(systemUriConfig.getHome, {
        templateUrl: 'expose/client/list',
        controller: 'ClientListController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when(systemUriConfig.getCreateClient, {
        templateUrl: 'expose/client/save',
        controller: 'ClientCreateController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when(systemUriConfig.getEditClient, {
        templateUrl: 'expose/client/save',
        controller: 'ClientEditController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when(systemUriConfig.getRemoveClient, {
        templateUrl: 'expose/client/remove',
        controller: 'ClientRemoveController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when(systemUriConfig.getUser, {
        templateUrl: 'expose/user/list',
        controller: 'UserController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      when(systemUriConfig.get404, {
        templateUrl: 'expose/main/404',
        controller: 'UserController',
        resolve: {
          loggedin: auth.checkLoggedin
        }
      }).
      otherwise({
        redirectTo: systemUriConfig.get404
      });
    $locationProvider.html5Mode(true);
  }

  routerConfig.$inject = ['$routeProvider', '$locationProvider', 'systemUriConfig'];

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services',
    'app.factorys',
    'app.constants',
    'ngSanitize',
    'ngRoute',
    'ngResource',
    'ngAnimate'
  ])
    .config(routerConfig);
}(angular));

