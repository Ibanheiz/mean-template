module.exports = function(_login) {

  function SignupController($scope, $http, $timeout, $location, LoginService) {
    $scope.showModal = false;

    $scope.createUser = function (user) {
      if (_login.validatePassword(user)) {
        LoginService.create(user).then(function (data) {
          _login.cbCreateSucess(data, $scope, $timeout, $location, $scope.systemUri);
        }, function (err) {
          _login.cbError('Erro ao criar o usuário.', err, $scope);
        });
      } else {
        $scope.message = "Senha diferente da confirmação";
        _login.showModal($scope, $timeout);
      }
    };
  }

  SignupController.$inject = ['$scope', '$http', '$timeout', '$location', 'LoginService'];

  return SignupController;
}