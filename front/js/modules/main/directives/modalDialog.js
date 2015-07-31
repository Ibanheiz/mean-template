'use strict';

var directivesModule = require('./_index');

function modalDialog() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function (scope, element, attrs) {
      // Gambis para não mostrar modal ao carregar a tela
      setTimeout(function () {
        element.removeAttr('style');
      }, 1000);

      scope.hideModal = function () {
        scope.show = false;
      };
    },
    templateUrl: 'partials/template-modal'
  };
}

directivesModule.directive('modalDialog', modalDialog);