'use strict';

var controllerModules = require('./_index');

function ClientCreateController($scope, $timeout, ClientService, ClientMessages) {
  $scope.title = "Novo Cliente";
  $scope.client = {};
  $scope.client.pessoa = 'fisica';
  $scope.showModal = false;

  $scope.save = function (client) {
    ClientService.create(client).then(function (data) {
      ClientMessages.cbCreateSucess(data, $scope, $timeout);
    }, function (err) {
      ClientMessages.cbError('Erro ao cadastrar o Cliente: ', err, $scope);
    });
  };

  $scope.isPessoaFisica = function () {
    return ClientMessages.isPessoaFisica($scope);
  };

  $scope.isCadastro = function () {
    return ClientMessages.isCadastro($scope);
  };

  $scope.resetCpfCnpj = function () {
    ClientMessages.resetCpfCnpj($scope);
  };
}

controllerModules.controller('ClientCreateController', ClientCreateController);