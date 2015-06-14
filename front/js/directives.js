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

  function toggleComponent() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          var targetId = attrs.targetId;
          var elm = angular.element(document.getElementById(targetId));
          var showClass = (attrs.hasOwnProperty('showClass')) ? attrs.showClass : 'div-show';
          if (elm.hasClass(showClass)) {
            elm.removeClass(showClass);
          } else {
            elm.addClass(showClass);
          }
        });
      }
    };
  }

  angular.module('app.directives',
    [
      'app.modules.Client.directives'
    ])
    .directive('toggleComponent', toggleComponent)
    .directive('modalDialog', modalDialog);

}(angular));
