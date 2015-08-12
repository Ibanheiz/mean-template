'use strict';

var controllerModules = require('./_index');

/**
 * @ngInject
 */
function ClientEditController($scope, $routeParams, $timeout, ClientService, ClientMessages) {
  var service = ClientService;
  $scope.readonly = true;
  $scope.showModal = false;

  var id = $routeParams.id;
  service.findOneById(id).then(function (data) {
    ClientMessages.cbShowSucess(data, $scope);
  }, function (err) {
    ClientMessages.cbError('Erro ao exibir o Cliente: ', err, $scope);
  });

  $scope.save = function (client) {
    service.update(client).then(function () {
      ClientMessages.cbUpdateSucess($scope, $timeout);
    }, function (err) {
      ClientMessages.cbError('Erro ao alterar o Cliente: ', err, $scope);
    });
  };

  $scope.edit = function () {
    $scope.readonly = false;
  };

  $scope.cancel = function () {
    $scope.readonly = true;
    if (!angular.equals($scope.clientCopy, $scope.client)) {
      angular.copy($scope.clientCopy, $scope.client);
    }
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

controllerModules.controller('ClientEditController', ClientEditController);