(function (angular) {
  'use strict';

  var _user = {};

  // Functions
  function MainController($scope, $http, $cookieStore) {
    $scope.isAuthenticated = function () {
      return (angular.isDefined($cookieStore.get('user')));
    };
  }

  // Controllers
  angular.module('app.modules.Main.controllers', [])
    .controller('MainController', MainController);

  // Inject
  MainController.$inject = ['$scope', '$http', '$cookieStore'];

}(angular));


