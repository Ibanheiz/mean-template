(function(angular) {
  'use strict';


  var _user = {};

  angular.module('app.modules.Client.controllers', [])
  .controller('ClientController',
    ['$scope', '$http',
    function ($scope, $http, VsrService, $upload, $sce) {
      $scope.mensagem = "Listagem de Clientes";
    }
    ]);
})(angular);