((angular, window) => {
  'use strict';

  class ModuleLoader {
    constructor($ocLazyLoadProvider) {
      let self = this;
      self.$get = ['$rootScope', '$location', ($rootScope, $location) => {
        return {
          useDynamicLoader() {
            $rootScope.$on('$routeChangeStart', (evt, nextRoute) => {
              if (self.shouldLoadModule($location)) {
                evt.preventDefault();
              }
            });
          }
        }
      }];
    }
    shouldLoadModule($location) {
      let path = $location.path();
      console.log(path);
      if (path === '/' || path.indexOf('/core') === 0) {
        return false;
      }
      return true;
    }
  }

  ModuleLoader.$inject = ['$ocLazyLoadProvider'];

  angular.module('core')
    .provider('hmModuleLoader', ModuleLoader);
})(window.angular, window);