(function (angular) {
  'use strict';

  function modalDialog() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true,
      transclude: true,
      link: function (scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width) {
          scope.dialogStyle.width = attrs.width;
        }
        if (attrs.minHeight) {
          scope.dialogStyle.minHeight = attrs.minHeight;
        }
        if (attrs.padding) {
          scope.dialogStyle.paddingTop =  attrs.padding;
          scope.dialogStyle.paddingBottom =  attrs.padding;
        }

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

  angular.module('app.modules.Client.directives', [])
    .directive('modalDialog', modalDialog);

}(angular));
