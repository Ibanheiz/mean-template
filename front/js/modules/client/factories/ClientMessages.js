'use strict';

var factoriesModule = require('./_index');

/**
 * @ngInject
 */
function MessageFactory() {
  var messages = {
    removeItem: function (arr, item) {
      var index = arr.indexOf(item);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    cbFindAllSucess: function (data, $scope) {
      $scope.clients = data.data;
      $scope.message = 'Listando todos os Cliente';
      console.log(data);
    },
    cbCreateSucess: function (data, $scope, $timeout) {
      $scope.message = 'Cliente ' + data.data.razaoSocial + ' cadastrado com sucesso';
      $scope.client = {};
      messages.showModal($scope, $timeout);
    },
    cbShowSucess: function (data, $scope) {
      $scope.client = data.data;
      var client = $scope.client;
      $scope.title = "Alterando o Cliente " + $scope.client.razaoSocial;
      $scope.client.pessoa = (client.cpf && client.cpf !== '') ? 'fisica' : 'juridica';
      $scope.message = 'Cliente ' + $scope.client.razaoSocial + ' sendo exibido';
      messages.copy($scope);
    },
    cbUpdateSucess: function ($scope, $timeout) {
      $scope.message = 'Cliente ' + $scope.client.razaoSocial + ' alterado com sucesso';
      $scope.readonly = true;
      messages.copy($scope);
      messages.showModal($scope, $timeout);
    },
    cbRemoveSucess: function (client, $scope) {
      $scope.message = 'Cliente ' + client.razaoSocial + ' removido com sucesso';
    },
    cbError: function (message, error, $scope) {
      console.log(error);
      $scope.status = message + error.message;
    },
    isPessoaFisica: function ($scope) {
      if (angular.isDefined($scope.client) && $scope.client.pessoa === 'fisica') {
        return true;
      }
    },
    isCadastro: function ($scope) {
      if (angular.isUndefined($scope.client) || angular.isUndefined($scope.client._id)) {
        return true;
      }
      return false;
    },
    resetCpfCnpj: function ($scope) {
      $scope.client.cpf = null;
      $scope.client.cnpj = null;
    },
    copy: function ($scope) {
      $scope.clientCopy = angular.copy($scope.client);
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

factoriesModule.factory('ClientMessages', MessageFactory);