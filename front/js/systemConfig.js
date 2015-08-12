'use strict';

/**
 * @ngInject
 */
function checkUser($q, $http, cb) {
  var deferred = $q.defer();
  // Verifica se existe um usuário autenticado
  $http.get('/api/login/loggedin').success(function (user) {
    cb(deferred, user);
  });
  return deferred.promise;
}

var auth = {
  checkLoggedin: ['$q', '$http', '$location', '$cookieStore', 'systemUri',
    function ($q, $http, $location, $cookieStore, systemUri) {
      checkUser($q, $http, function (deferred, user) {
        if (user !== '0') {
          $cookieStore.put('user', user);
          deferred.resolve();
        } else {
          deferred.reject();
          $location.url(systemUri.getLogin());
        }
      });
    }],
  checkLoggedOut: ['$q', '$http', '$location', '$cookieStore', 'systemUri',
    function ($q, $http, $location, $cookieStore, systemUri) {
      checkUser($q, $http, function (deferred, user) {
        if (user !== '0') {
          deferred.reject();
          $location.url(systemUri.getHome());
        } else {
          $cookieStore.remove('user');
          deferred.resolve();
        }
      });
    }]
};

/**
 * @ngInject
 */
function routerConfig($routeProvider, $locationProvider, SystemUriConfig) {
  $routeProvider.
    when(SystemUriConfig.getLogin, {
      templateUrl: 'expose/login/login',
      controller: 'LoginController',
      resolve: {
        loggedin: auth.checkLoggedOut
      }
    }).
    when(SystemUriConfig.getSignup, {
      templateUrl: 'expose/login/signup',
      controller: 'SignupController',
      resolve: {
        loggedin: auth.checkLoggedOut
      }
    }).
    when(SystemUriConfig.getHome, {
      templateUrl: 'expose/client/list',
      controller: 'ClientListController',
      resolve: {
        loggedin: auth.checkLoggedin
      }
    }).
    when(SystemUriConfig.getCreateClient, {
      templateUrl: 'expose/client/save',
      controller: 'ClientCreateController',
      resolve: {
        loggedin: auth.checkLoggedin
      }
    }).
    when(SystemUriConfig.getEditClient, {
      templateUrl: 'expose/client/save',
      controller: 'ClientEditController',
      resolve: {
        loggedin: auth.checkLoggedin
      }
    }).
    when(SystemUriConfig.getRemoveClient, {
      templateUrl: 'expose/client/remove',
      controller: 'ClientRemoveController',
      resolve: {
        loggedin: auth.checkLoggedin
      }
    }).
    when(SystemUriConfig.getUser, {
      templateUrl: 'expose/user/list',
      controller: 'UserController',
      resolve: {
        loggedin: auth.checkLoggedin
      }
    }).
    when(SystemUriConfig.get404, {
      templateUrl: 'expose/main/404',
      controller: 'UserController',
      resolve: {
        loggedin: auth.checkLoggedin
      }
    }).
    otherwise({
      redirectTo: SystemUriConfig.get404
    });
  $locationProvider.html5Mode(true);
}

module.exports = routerConfig;