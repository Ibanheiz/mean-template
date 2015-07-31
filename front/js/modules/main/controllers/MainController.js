'use strict';

var controllersModule = require('./_index');

function MainController($scope, $http, $cookieStore) {
  $scope.isAuthenticated = function () {
    return (angular.isDefined($cookieStore.get('user')));
  };
}

controllersModule.controller('MainController', MainController);
