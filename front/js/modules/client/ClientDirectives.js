(function (angular) {
  'use strict';

  function ShowDialog() {
    return {
      restrict: 'A',
      link: function (scope, iElement, iAttrs) {

      }
    };
  }

  angular.module('app.modules.Client.directives', [])
    .directive('showDialog', ShowDialog);

}(angular));
