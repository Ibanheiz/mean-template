(function (angular) {
  'use strict';

  var _user = {};

  // Functions
  function UserController($scope, $http) {
    $scope.mensagem = "Listagem de Usuários";
  }

  // Controllers
  angular.module('app.modules.User.controllers', [])
    .controller('UserController', UserController);

  // Inject
  UserController.$inject = ['$scope', '$http'];

}(angular));


