(function (angular) {
  'use strict';

  var _client = {
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
      _client.showModal($scope, $timeout);
    },
    cbShowSucess: function (data, $scope) {
      $scope.client = data.data;
      var client = $scope.client;
      $scope.title = "Alterando o Cliente " + $scope.client.razaoSocial;
      $scope.pessoa = (client.cpf && client.cpf !== '') ? 'fisica' : 'juridica';
      $scope.message = 'Cliente ' + $scope.client.razaoSocial + ' sendo exibido';
      _client.copy($scope);
    },
    cbUpdateSucess: function ($scope, $timeout) {
      $scope.message = 'Cliente ' + $scope.client.razaoSocial + ' alterado com sucesso';
      $scope.readonly = true;
      _client.copy($scope);
      _client.showModal($scope, $timeout);
    },
    cbRemoveSucess: function (client, $scope) {
      $scope.message = 'Cliente ' + client.razaoSocial + ' removido com sucesso';
    },
    cbError: function (message, error, $scope) {
      console.log(error);
      $scope.status = message + error.message;
    },
    findClienteById: function (service, $scope, $routeParams) {
      var id = $routeParams.id;
      service.findOneById(id).then(function (data) {
        _client.cbShowSucess(data, $scope);
      }, function (err) {
        _client.cbError('Erro ao exibir o Cliente: ', err, $scope);
      });
    },
    isPessoaFisica: function ($scope) {
      if ($scope.pessoa === 'fisica') {
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
      $scope.pessoaCopy  = angular.copy($scope.pessoa);
    },
    showModal: function ($scope, $timeout) {
      $scope.showModal = !$scope.showModal;
      $timeout(function () {
        $scope.showModal = !$scope.showModal;
      }, 4000);
    }
  };

  // Functions
  function ClientListController($scope, ClientService) {
    ClientService.findAll().then(function (data) {
      _client.cbFindAllSucess(data, $scope);
    }, function (err) {
      _client.cbError('Erro ao buscar os Clientes: ', err, $scope);
    });
  }

  function ClientCreateController($scope, $timeout, ClientService) {
    $scope.title = "Novo Cliente";
    $scope.pessoa = 'fisica';
    $scope.showModal = false;

    $scope.save = function (client) {
      ClientService.create(client).then(function (data) {
        _client.cbCreateSucess(data, $scope, $timeout);
      }, function (err) {
        _client.cbError('Erro ao cadastrar o Cliente: ', err, $scope);
      });
    };

    $scope.isPessoaFisica = function () {
      return _client.isPessoaFisica($scope);
    };

    $scope.isCadastro = function () {
      return _client.isCadastro($scope);
    };

    $scope.resetCpfCnpj = function () {
      _client.resetCpfCnpj($scope);
    };
  }

  function ClientEditController($scope, $routeParams, $timeout, ClientService) {
    var service = ClientService;
    $scope.readonly = true;
    $scope.showModal = false;

    _client.findClienteById(service, $scope, $routeParams);

    $scope.save = function (client) {
      service.update(client).then(function () {
        _client.cbUpdateSucess($scope, $timeout);
      }, function (err) {
        _client.cbError('Erro ao alterar o Cliente: ', err, $scope);
      });
    };

    $scope.edit = function () {
      $scope.readonly = false;
    };

    $scope.cancel = function () {
      $scope.readonly = true;
      angular.copy($scope.clientCopy, $scope.client);
      angular.copy($scope.pessoaCopy, $scope.pessoa);
    };

    $scope.isPessoaFisica = function () {
      return _client.isPessoaFisica($scope);
    };

    $scope.isCadastro = function () {
      return _client.isCadastro($scope);
    };

    $scope.resetCpfCnpj = function () {
      _client.resetCpfCnpj($scope);
    };
  }

  function ClientRemoveController($scope, ClientService) {
    $scope.remove = function (client) {
      if (confirm('Deseja realmente excluir o Cliente ' + client.razaoSocial + '?')) {
        ClientService.remove(client).then(function () {
          _client.cbRemoveSucess(client, $scope);
          _client.removeItem($scope.clients, client);
        }, function (err) {
          _client.cbError('Erro ao alterar o Cliente: ', err, $scope);
        });
      }
    };
  }

  function ClientShowController($scope, $routeParams, ClientService) {
    _client.findClienteById(ClientService, $scope, $routeParams);
  }

  // Controllers
  angular.module('app.modules.Client.controllers', [])
    .controller('ClientListController', ClientListController)
    .controller('ClientCreateController', ClientCreateController)
    .controller('ClientEditController', ClientEditController)
    .controller('ClientRemoveController', ClientRemoveController)
    .controller('ClientShowController', ClientShowController);

  // Inject
  ClientListController.$inject = ['$scope', 'ClientService'];
  ClientCreateController.$inject = ['$scope', '$timeout', 'ClientService'];
  ClientEditController.$inject = ['$scope', '$routeParams', '$timeout', 'ClientService'];
  ClientRemoveController.$inject = ['$scope', 'ClientService'];
  ClientShowController.$inject = ['$scope', '$routeParams', 'ClientService'];

}(angular));