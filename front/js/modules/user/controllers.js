(function(angular) {
  'use strict';


  var _user = {};

  angular.module('app.modules.User.controllers', [])
  .controller('appController',
    ['$scope', '$http',
    function ($scope, $http, VsrService, $upload, $sce) {
      $scope.mensagem = "Listagem de usuários";
    }
    ]);
})(angular);
