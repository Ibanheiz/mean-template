(function(angular) {

  angular.module('app.modules.Client.services', [])
    .service('ClientService', ClientService);

  // Inject
  ClientService.$inject = ['$http'];

  // Functions
  function ClientService ($http) {
    var url = 'api/client';

    this.findAll = function () {
      return $http.get(url);
    };

    this.findOneById = function (id) {
      return $http.get(url + '/id/' + id);
    };

    this.save = function (data) {
      return $http.post(url, data);
    };

    this.update = function (data) {
      return $http.put(url + '/id/' + data._id, data);
    };

    this.remove = function (data) {
      return $http.delete(url + '/id/' + data._id, data);
    };
  }
})(angular);


