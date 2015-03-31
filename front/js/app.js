(function (angular) {
  'use strict';

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
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

      var checkLoggedin = ['$q', '$http', '$location', function ($q, $http, $location) {
        // Inicializa a promisse
        var deferred = $q.defer();
        // Verifica se existe um usuário autenticado
        $http.get('/loggedin').success(function (user) {
          if (user !== '0') {
            deferred.resolve();
          } else {
            deferred.reject();
            $location.url('/mean-seed/login');
          }
        });
        return deferred.promise;
      }];

      $routeProvider.
        when('/mean-seed/login', {
          templateUrl: 'expose/login/login',
          controller: 'LoginController'
        }).
        when('/mean-seed/signup', {
          templateUrl: 'expose/login/signup',
          controller: 'SignupController'
        }).
        when('/mean-seed/client', {
          templateUrl: 'expose/client/list',
          controller: 'ClientListController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).
        when('/mean-seed/client/create', {
          templateUrl: 'expose/client/save',
          controller: 'ClientCreateController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).
        when('/mean-seed/client/:id/edit', {
          templateUrl: 'expose/client/save',
          controller: 'ClientEditController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).
        when('/mean-seed/client/:id/remove', {
          templateUrl: 'expose/client/edit',
          controller: 'ClientRemoveController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).
        when('/mean-seed/user', {
          templateUrl: 'expose/user/list',
          controller: 'UserController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).
        when('/mean-seed/404', {
          templateUrl: 'expose/main/404',
          controller: 'UserController',
          resolve: {
            loggedin: checkLoggedin
          }
        }).
        otherwise({
          redirectTo: '/mean-seed/404'
        });
      $locationProvider.html5Mode(true);
    }])
    .config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
      // Intercepta o response para saber se a requisição não foi autorizada
      $provide.factory('authenticateInterceptor', ['$q', '$location', function ($q, $location) {
        return {
          response: function (response) {
            return response;
          },
          responseError: function (response) {
            if (response.status === 401) {
              $location.url('/mean-seed/login');
            }
            return $q.reject(response);
          }
        };
      }]);
      $httpProvider.interceptors.push('authenticateInterceptor');
    }]);
}(angular));

