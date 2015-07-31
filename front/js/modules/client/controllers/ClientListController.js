'use strict';

var controllerModules = require('./_index');

function ClientListController($scope, ClientService, ClientMessages) {
  ClientService.findAll().then(function (data) {
    ClientMessages.cbFindAllSucess(data, $scope);
  }, function (err) {
    ClientMessages.cbError('Erro ao buscar os Clientes: ', err, $scope);
  });
}

controllerModules.controller('ClientListController', ClientListController);