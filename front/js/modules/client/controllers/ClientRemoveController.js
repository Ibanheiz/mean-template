'use strict';

var controllerModules = require('./_index');

/**
 * @ngInject
 */
function ClientRemoveController($scope, ClientService, ClientMessages) {
  $scope.remove = function (client) {
    if (confirm('Deseja realmente excluir o Cliente ' + client.razaoSocial + '?')) {
      ClientService.remove(client).then(function () {
        ClientMessages.cbRemoveSucess(client, $scope);
        ClientMessages.removeItem($scope.clients, client);
      }, function (err) {
        ClientMessages.cbError('Erro ao alterar o Cliente: ', err, $scope);
      });
    }
  };
}

controllerModules.controller('ClientRemoveController', ClientRemoveController);