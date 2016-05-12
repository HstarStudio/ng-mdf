((angular) => {
  'use strict';

  class TestCtrl {
    constructor() {

    }
  }

  TestCtrl.$inject = [];

  angular.module('test', [])
    .config(['$routeProvider', ($routeProvider) => {
      $routeProvider.when('/test', {
        template: 'test'
      })
    }])
    .controller('Test', TestCtrl);
})(window.angular);