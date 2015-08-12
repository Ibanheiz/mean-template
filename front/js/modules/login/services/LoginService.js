'use strict';

var servicesModule = require('./_index');

/**
 * @ngInject
 */
function LoginService($http) {
  this.create = function (data) {
    return $http.post('api/login/signup', data);
  };
  this.login = function (data) {
    return $http.post('api/login/login', data);
  };
  this.signout = function () {
    return $http.get('api/login/signout');
  };
}

servicesModule.service('LoginService', LoginService);
