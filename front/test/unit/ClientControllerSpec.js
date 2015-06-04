(function () {
  describe('ClientControler', function () {

    var $scope, $httpBackend, $http, controllerMock;

    beforeEach(function () {
      module('app');
      inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $http = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/api/client').respond(200, {_id: '1', razaoSocial: "Ibanheiz LTDA"});
        controllerMock = $injector.get('$controller');
      });
    });

    describe('findOneById()', function () {
      it('Buscar Cliente por id', function () {
        controllerMock('ClientListController', {
          $scope: $scope,
          $http: $http
        });
        $httpBackend.flush()
        expect($scope.client).toBeUndefined();
      });
    });

    describe('teste()', function () {

    });
  });
}());