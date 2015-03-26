(function(angular) {
  'use strict';

  var _client = {
    cbFindAllSucess: function (data, $scope) {
      $scope.clients = data.data;
      $scope.message = 'Listando todos os Cliente';
      console.log(data);
    },
    cbCreateSucess: function (data, $scope) {
      $scope.client = data.data;
      $scope.message = 'Cliente cadastrado com sucesso';
    },
    cbShowSucess: function (data, $scope) {
      $scope.client = data.data;
      $scope.message = 'Cliente' + data.client.razaoSocial + ' sendo exibido';
    },
    cbUpdateSucess: function (data, $scope) {
      $scope.message = 'Cliente' + data.client.razaoSocial + ' alterado com sucesso';
    },
    cbRemoveSucess: function (data, $scope) {
      $scope.message = 'Cliente' + data.client.razaoSocial + ' removido com sucesso';
    },
    cbError: function (message, error, $scope) {
      $scope.status = message + error.message;
    },
    findClienteById: function (service, $scope, $routeParams) {
      var id = $routeParams.id;
      service.findOneById(id).then(function (data) {
        _client.cbShowSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao exibir o Cliente: ', error, $scope);
      });
    }
  };

  // Controllers
  angular.module('app.modules.Client.controllers', [])
  .controller('ClientListController', ClientListController)
  .controller('ClientCreateController', ClientCreateController)
  .controller('ClienteEditController', ClienteEditController)
  .controller('ClientRemoveController', ClientRemoveController)
  .controller('ClientShowController', ClientShowController);

  // Inject
  ClientListController.$inject = ['$scope', '$http', 'ClientService'];
  ClientCreateController.$inject = ['$scope', '$http', 'ClientService'];
  ClienteEditController.$inject = ['$scope', '$http', '$routeParams', 'ClientService'];
  ClientRemoveController.$inject = ['$scope', '$http', '$routeParams', 'ClientService'];
  ClientShowController.$inject = ['$scope', '$http', '$routeParams', 'ClientService'];

  // Functions
  function ClientListController ($scope, $http, ClientService) {
    ClientService.findAll().then(function (data) {
      _client.cbFindAllSucess(data, $scope);
    }, function (error) {
      _client.cbError('Erro ao buscar os Clientes', error, $scope);
    });
  }

  function ClientCreateController ($scope, $http, ClientService) {
    $scope.create = function (client) {
      ClientService.create(client).then(function (data) {
        _client.cbCreateSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao cadastrar o Cliente', error, $scope);
      });
    };
  }

  function ClienteEditController ($scope, $http, $routeParams, ClientService) {
    var service = ClientService;

    _client.findClienteById (service, $scope, $routeParams);

    $scope.update = function (client) {
      service.update(client).then(function (data) {
        _client.cbUpdateSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao alterar o Cliente', error, $scope);
      });
    };
  }

  function ClientRemoveController ($scope, $http, $routeParams, ClientService) {
    var service = ClientService;

    _client.findClienteById (service, $scope, $routeParams);

    $scope.remove = function (client) {
      service.remove(client).then(function (data) {
        _client.cbRemoveSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao alterar o Cliente', error, $scope);
      });
    };
  }

  function ClientShowController ($scope, $http, $routeParams, ClientService) {
    _client.findClienteById (service, $scope, $routeParams);
  }

})(angular);


