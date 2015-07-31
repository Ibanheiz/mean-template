'use strict';

var controllersModule = require('./_index');

function LoginController($scope, $http, $timeout, $location, LoginService, LoginMessages) {
  $scope.showModal = false;

  $scope.login = function (user) {
    LoginService.login(user).then(function (data) {
      LoginMessages.cbValidateLogin(data, $scope, $timeout, $location, $scope.systemUri);
    }, function (err) {
      LoginMessages.cbError('Erro ao efetuar Login.', err, $scope);
    });
  };

  $scope.signout = function () {
    LoginService.signout().then(function () {
      $location.url($scope.systemUri.getLogin());
    }, function (err) {
      LoginMessages.cbError('Erro ao efetuar logout.', err, $scope);
    });
  };
}

controllersModule.controller('LoginController', LoginController);

