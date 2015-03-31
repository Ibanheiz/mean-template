(function (angular) {
  'use strict';

  var _login = {
    cbCreateSucess: function (data, $scope, $timeout) {
      $scope.message = 'Usuário cadastrado com sucesso';
      $scope.user = {};
      _login.showModal($scope, $timeout);
    },
    cbLoginInvalid: function (data, $scope, $timeout) {
      $scope.message = data.data;
      $scope.user = {};
      _login.showModal($scope, $timeout);
    },
    validatePassword: function (user) {
      return (user.confirmPassword === user.password);
    },
    cbError: function (message, error, $scope) {
      console.log(error);
      $scope.status = message + ' ' + error.message;
    },
    showModal: function ($scope, $timeout) {
      $scope.showModal = !$scope.showModal;
      $timeout(function () {
        $scope.showModal = !$scope.showModal;
      }, 4000);
    }
  };

  // Functions
  function LoginController($scope, $http, $timeout, LoginService) {
    $scope.showModal = false;
    $scope.login = function (user) {
      LoginService.login(user).then(function (err) {
        _login.cbError('Erro ao criar o usuário.', err, $scope);
      });
    };
  }
  function SignupController($scope, $http, $timeout, LoginService) {
    $scope.showModal = false;
    $scope.createUser = function (user) {
      if (_login.validatePassword(user)) {
        LoginService.create(user).then(function (data) {
          _login.cbCreateSucess(data, $scope, $timeout);
        }, function (err) {
          _login.cbError('Erro ao criar o usuário.', err, $scope);
        });
      } else {
        $scope.message = "Senha diferente da confirmação";
        _login.showModal($scope, $timeout);
      }
    };
  }

  // Controllers
  angular.module('app.modules.Login.controllers', [])
    .controller('LoginController', LoginController)
    .controller('SignupController', SignupController);

  // Inject
  LoginController.$inject = ['$scope', '$http', '$timeout', 'LoginService' ];
  SignupController.$inject = ['$scope', '$http', '$timeout', 'LoginService'];

}(angular));


