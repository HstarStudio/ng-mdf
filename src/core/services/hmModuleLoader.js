((angular, window) => {
  'use strict';

  class ModuleLoader {
    constructor() {
      let self = this;
      self.$get = ['$rootScope', '$location', '$timeout', '$route', '$ocLazyLoad', ($rootScope, $location, $timeout, $route, $ocLazyLoad) => {
        return {
          useDynamicLoader() {
            $rootScope.$on('$routeChangeStart', (evt, nextRoute) => {
              let path = $location.path();
              let moduleName = self.getModuleName(path);
              let search = $location.search();
              if (self.shouldLoadModule(path, moduleName)) {
                evt.preventDefault();
                $location.path('/core/loading')
                $ocLazyLoad.load([`/modules/${moduleName}/app.js`])
                  .then(() => {
                    $timeout(() => {
                      $location.search(search);
                      $location.path(path).replace();
                    });
                  }, () => {
                    $timeout(() => {
                      $location.path('/core/404');
                    });
                  });
              }
            });
          }
        }
      }];
    }
    shouldLoadModule(path, moduleName) {
      console.log(path);
      if (path === '/' || path.indexOf('/core') === 0) {
        return false;
      }
      if (this.isModuleExists(moduleName)) {
        return false;
      }
      return true;
    }

    isModuleExists(moduleName) {
      try {
        angular.module(moduleName);
        return true;
      } catch (e) {
        return false;
      }
    }

    getModuleName(path) {
      path = path || '';
      let pathArr = path.split('/');
      return pathArr.length > 1 ? pathArr[1] : '';
    }
  }

  ModuleLoader.$inject = [];

  angular.module('core')
    .provider('hmModuleLoader', ModuleLoader);
})(window.angular, window);