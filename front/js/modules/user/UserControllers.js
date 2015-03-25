(function(angular) {
  'use strict';

  var _user = {};

  // Controllers
  angular.module('app.modules.User.controllers', [])
    .controller('UserController', UserController);

  // Inject
  UserController.$inject = ['$scope', '$http'];

  // Functions
  function UserController ($scope, $http) {
    $scope.mensagem = "Listagem de Usuários";
  }
})(angular);


