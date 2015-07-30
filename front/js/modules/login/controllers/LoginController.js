module.exports = function (_login) {

  function LoginController($scope, $http, $timeout, $location, LoginService) {
    $scope.showModal = false;

    $scope.login = function (user) {
      LoginService.login(user).then(function (data) {
        _login.cbValidateLogin(data, $scope, $timeout, $location, $scope.systemUri);
      }, function (err) {
        _login.cbError('Erro ao efetuar Login.', err, $scope);
      });
    };

    $scope.signout = function () {
      LoginService.signout().then(function (data) {
        $location.url($scope.systemUri.getLogin());
      }, function (err) {
        _login.cbError('Erro ao efetuar logout.', err, $scope);
      });
    };
  }

  LoginController.$inject = ['$scope', '$http', '$timeout', '$location', 'LoginService'];

  return LoginController;
}