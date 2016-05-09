((angualr) => {
  var app = angular.module('ng-modular-app', ['ngRoute', 'core']);

  app.config(['$locationProvider', ($locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).otherwise;
  }]);

  app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/dashboard', {
      template: 'test'
    });
    $routeProvider.when('/404', {
      template: '<h1>404</h1>'
    });
    $routeProvider.otherwise('/404');
  }]);

  angular.bootstrap(document, ['ng-modular-app']);
})(window.angular);
