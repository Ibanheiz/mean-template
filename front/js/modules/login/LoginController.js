(function (angular) {
  'use strict';

  var _login = {};

  // Functions
  function LoginController($scope, $http) {
    $scope.mensagem = "Faça login meu jovem";
  }

  // Controllers
  angular.module('app.modules.Login.controllers', [])
    .controller('LoginController', LoginController);

  // Inject
  LoginController.$inject = ['$scope', '$http'];

}(angular));


