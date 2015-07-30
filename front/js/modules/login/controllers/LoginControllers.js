'use strict';

var controllersModule = require('./_index');
var LoginController = require('./LoginController');
var SignupController = require('./SignupController')

var _login = {
  cbCreateSucess: function (data, $scope, $timeout, $location, systemUri) {
    $scope.message = 'Usuário cadastrado com sucesso';
    $scope.user = {};
    $location.url(systemUri.getHome());
    _login.showModal($scope, $timeout);
  },
  cbValidateLogin: function (data, $scope, $timeout, $location, systemUri) {
    var user = data.data.user;
    if (user) {
      $location.url(systemUri.getHome());
    } else {
      $scope.message = data.data.message;
      $scope.user.password = null;
      _login.showModal($scope, $timeout);
    }
  },
  validatePassword: function (user) {
    return (user.confirmPassword === user.password);
  },
  cbError: function (message, error, $scope) {
    $scope.status = message + ' ' + error.message;
  },
  showModal: function ($scope, $timeout) {
    $scope.showModal = !$scope.showModal;
    $timeout(function () {
      $scope.showModal = !$scope.showModal;
    }, 4000);
  }
};

controllersModule.controller('LoginController', LoginController(_login));
controllersModule.controller('SignupController', SignupController(_login));