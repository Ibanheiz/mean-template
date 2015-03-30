(function (angular) {
  'use strict';

  angular.module('app.controllers',
    [
      'app.modules.User.controllers',
      'app.modules.Client.controllers',
      'app.modules.Login.controllers'
    ]);
}(angular));
