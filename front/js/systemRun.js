'use strict';

function run($rootScope, systemUri) {
  $rootScope.systemUri = systemUri;
}

run.$inject = ['$rootScope', 'systemUri'];