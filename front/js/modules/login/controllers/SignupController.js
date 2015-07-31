'use strict';

var controllersModule = require('./_index');

function SignupController($scope, $http, $timeout, $location, LoginService, LoginMessages) {
  $scope.showModal = false;

  $scope.createUser = function (user) {
    if (LoginMessages.validatePassword(user)) {
      LoginService.create(user).then(function (data) {
        LoginMessages.cbCreateSucess(data, $scope, $timeout, $location, $scope.systemUri);
      }, function (err) {
        LoginMessages.cbError('Erro ao criar o usuário.', err, $scope);
      });
    } else {
      $scope.message = "Senha diferente da confirmação";
      LoginMessages.showModal($scope, $timeout);
    }
  };
}

controllersModule.controller('SignupController', SignupController);
