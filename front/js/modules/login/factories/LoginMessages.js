'use strict';

var factoriesModule = require('./_index');

function MessageFactory() {
  var messages = {
    cbCreateSucess: function (data, $scope, $timeout, $location, systemUri) {
      $scope.message = 'Usuário cadastrado com sucesso';
      $scope.user = {};
      $location.url(systemUri.getHome());
      messages.showModal($scope, $timeout);
    },
    cbValidateLogin: function (data, $scope, $timeout, $location, systemUri) {
      var user = data.data.user;
      if (user) {
        $location.url(systemUri.getHome());
      } else {
        $scope.message = data.data.message;
        $scope.user.password = null;
        messages.showModal($scope, $timeout);
      }
    },
    validatePassword: function (user) {
      return (user.confirmPassword === user.password);
    },
    cbError: function (message, error, $scope) {
      $scope.status = message + ' ' + error.message;
    },
    showModal: function ($scope, $timeout) {
      $scope.showModal = !$scope.showModal;
      $timeout(function () {
        $scope.showModal = !$scope.showModal;
      }, 4000);
    }
  };
  return messages;
}

factoriesModule.factory('LoginMessages', MessageFactory);