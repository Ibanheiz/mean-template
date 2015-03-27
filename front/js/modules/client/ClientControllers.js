(function(angular) {
  'use strict';

  var _client = {
    removeItem: function (arr, item){
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
    cbCreateSucess: function (data, $scope) {
      $scope.client = data.data;
      $scope.message = 'Cliente cadastrado com sucesso';
    },
    cbShowSucess: function (data, $scope) {
      $scope.client = data.data;
      $scope.title = "Alterando o Cliente " + $scope.client.razaoSocial;
      $scope.message = 'Cliente' + $scope.client.razaoSocial + ' sendo exibido';
    },
    cbUpdateSucess: function (client, $scope) {
      $scope.message = 'Cliente' + client.razaoSocial + ' alterado com sucesso';
    },
    cbRemoveSucess: function (client, $scope) {
      $scope.message = 'Cliente' + client.razaoSocial + ' removido com sucesso';
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
  .controller('ClientEditController', ClientEditController)
  .controller('ClientRemoveController', ClientRemoveController)
  .controller('ClientShowController', ClientShowController);

  // Inject
  ClientListController.$inject = ['$scope', '$http', 'ClientService'];
  ClientCreateController.$inject = ['$scope', '$http', 'ClientService'];
  ClientEditController.$inject = ['$scope', '$http', '$routeParams', 'ClientService'];
  ClientRemoveController.$inject = ['$scope', '$http', '$routeParams', 'ClientService'];
  ClientShowController.$inject = ['$scope', '$http', '$routeParams', 'ClientService'];

  // Functions
  function ClientListController ($scope, $http, ClientService) {
    ClientService.findAll().then(function (data) {
      _client.cbFindAllSucess(data, $scope);
    }, function (error) {
      _client.cbError('Erro ao buscar os Clientes: ', error, $scope);
    });
  }

  function ClientCreateController ($scope, $http, ClientService) {
    $scope.title = "Novo Cliente";
    $scope.create = function (client) {
      ClientService.create(client).then(function (data) {
        _client.cbCreateSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao cadastrar o Cliente: ', error, $scope);
      });
    };
  }

  function ClientEditController ($scope, $http, $routeParams, ClientService) {
    var service = ClientService;
    _client.findClienteById(service, $scope, $routeParams);

    $scope.update = function (client) {
      service.update(client).then(function (data) {
        _client.cbUpdateSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao alterar o Cliente: ', error, $scope);
      });
    };
  }

  function ClientRemoveController ($scope, $http, $routeParams, ClientService) {
    $scope.remove = function (client) {
      if(confirm('Deseja realmente excluir o Cliente ' + client.razaoSocial + '?')){
        ClientService.remove(client).then(function (data) {
          _client.cbRemoveSucess(client, $scope);
          _client.removeItem($scope.clients, client);
        }, function (err) {
          _client.cbError('Erro ao alterar o Cliente: ', error, $scope);
        });
      }
    };
  }

  function ClientShowController ($scope, $http, $routeParams, ClientService) {
    _client.findClienteById(ClientService, $scope, $routeParams);
  }

})(angular);


