(function (angular) {
  'use strict';

  var _login = {
    getHome: function () {
      return 'mean-seed/client';
    },
    cbCreateSucess: function (data, $scope, $timeout, $location) {
      $scope.message = 'Usuário cadastrado com sucesso';
      $scope.user = {};
      $location.url(_login.getHome());
      _login.showModal($scope, $timeout);
    },
    cbValidateLogin: function (data, $scope, $timeout, $location) {
      console.log(data.data);
      var user = data.data.user;
      if (user) {
        console.log(user);
        $location.url(_login.getHome());
      } else {
        console.log(data.data.message);
        $scope.message = data.data.message;
        $scope.user.password = null;
        _login.showModal($scope, $timeout);
      }
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
  function LoginController($scope, $http, $timeout, $location, LoginService) {
    $scope.showModal = false;

    $scope.login = function (user) {
      LoginService.login(user).then(function (data) {
        _login.cbValidateLogin(data, $scope, $timeout, $location);
      }, function (err) {
        _login.cbError('Erro ao efetuar Login.', err, $scope);
      });
    };

    $scope.signout = function () {
      LoginService.signout().then(function (data) {
        console.log(data);
        $location.url('mean-seed/login');
      }, function (err) {
        _login.cbError('Erro ao efetuar logout.', err, $scope);
      });
    };
  }

  function SignupController($scope, $http, $timeout, $location, LoginService) {
    $scope.showModal = false;
    $scope.createUser = function (user) {
      if (_login.validatePassword(user)) {
        LoginService.create(user).then(function (data) {
          _login.cbCreateSucess(data, $scope, $timeout, $location);
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
  LoginController.$inject = ['$scope', '$http', '$timeout', '$location', 'LoginService' ];
  SignupController.$inject = ['$scope', '$http', '$timeout', '$location', 'LoginService'];

}(angular));


