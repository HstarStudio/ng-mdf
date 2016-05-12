((angualr) => {
  'use strict';
  var app = angular.module('ng-modular-app', ['ngRoute', 'core']);

  app.config(['$locationProvider', ($locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).otherwise;
  }]);

  app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', {
      template: 'Hoe'
    });
    $routeProvider.when('/core/404', {
      template: '<h1>404 Not Found</h1>'
    });
    $routeProvider.when('/core/loading', {
      template: 'Loading'
    });
    $routeProvider.otherwise('/core/404');
  }]);

  app.run(['$location', ($location) => {
    let path = $location.path();
    if (path === '/core/loading') {
      $location.path('/');
    }
  }]);

  angular.bootstrap(document, ['ng-modular-app']);
})(window.angular);