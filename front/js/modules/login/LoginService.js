(function (angular) {
  // Functions
  function LoginService($http) {
    this.create = function (data) {
      return $http.post('api/login/signup', data);
    };
    this.login = function (data) {
      return $http.post('api/login/login', data);
    };
  }

  // Services
  angular.module('app.modules.Login.services', [])
    .service('LoginService', LoginService);

  // Inject
  LoginService.$inject = ['$http'];
}(angular));


