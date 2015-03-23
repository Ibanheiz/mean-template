(function(angular) {
  'use strict';


  var _user = {};

  angular.module('app.modules.User.controllers', [])
  .controller('UserController',
    ['$scope', '$http',
    function ($scope, $http) {
      $scope.mensagem = "Listagem de Usuários";
    }
    ]);
})(angular);
