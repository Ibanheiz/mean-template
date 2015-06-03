(function (angular) {
  'use strict';

  function systemUri(systemUriConfig) {
    return {
      getHome: function () {
        return systemUriConfig.getHome;
      },
      getLogin: function () {
        return systemUriConfig.getLogin;
      },
      getSignup: function () {
        return systemUriConfig.getSignup;
      },
      getCreateClient: function () {
        return systemUriConfig.getCreateClient;
      },
      getEditClient: function (id) {
        return systemUriConfig.getEditClient.replace(':id', id);
      },
      getRemoveClient: function (id) {
        return systemUriConfig.getRemoveClient.replace(':id', id);
      },
      getUser: function () {
        return systemUriConfig.getUser;
      },
      get404: function () {
        return systemUriConfig.get404;
      }
    };
  }

  systemUri.$inject = ['systemUriConfig'];

  angular.module('app.factorys', [])
    .factory('systemUri', systemUri);
}(angular));
