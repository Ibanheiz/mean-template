'use strict';

var controllerModules = require('./_index');

/**
 * @ngInject
 */
function ClientShowController($scope, $routeParams, ClientService, ClientMessages) {
  ClientMessages.findClienteById(ClientService, $scope, $routeParams);
}

controllerModules.controller('ClientShowController', ClientShowController);