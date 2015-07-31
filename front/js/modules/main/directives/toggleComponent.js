'use strict';

var directivesModule = require('./_index');

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

directivesModule.directive('toggleComponent', toggleComponent);