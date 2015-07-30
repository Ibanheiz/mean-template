/*(function (angular) {
  'use strict';

  function systemUri(SystemUriConfig) {
    return {
      getHome: function () {
        return SystemUriConfig.getHome;
      },
      getLogin: function () {
        return SystemUriConfig.getLogin;
      },
      getSignup: function () {
        return SystemUriConfig.getSignup;
      },
      getCreateClient: function () {
        return SystemUriConfig.getCreateClient;
      },
      getEditClient: function (id) {
        return SystemUriConfig.getEditClient.replace(':id', id);
      },
      getRemoveClient: function (id) {
        return SystemUriConfig.getRemoveClient.replace(':id', id);
      },
      getUser: function () {
        return SystemUriConfig.getUser;
      },
      get404: function () {
        return SystemUriConfig.get404;
      }
    };
  }

  systemUri.$inject = ['SystemUriConfig'];

  angular.module('app.factorys', [])
    .factory('systemUri', systemUri);
}(angular));
*/