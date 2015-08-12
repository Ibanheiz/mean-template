'use strict';

/**
 * @ngInject
 */
function run($rootScope, systemUri) {
  $rootScope.systemUri = systemUri;
}

module.exports = run;
