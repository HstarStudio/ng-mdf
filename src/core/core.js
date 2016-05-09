((angular, window) => {
  'use strict';
  let coreApp = angular.module('core', ['common']);
  coreApp.run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$includeContentLoaded', (evt, path) => {
      console.log(evt, path);
      if(path === '/core/app/ribbon.html'){
        window.initDemo();
      }
    });
  }]);
})(window.angular, window);