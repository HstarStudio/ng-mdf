((angualr) => {
  var app = angular.module('ng-modular-app', ['ngRoute', 'core']);

  app.config(['$locationProvider', ($locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    }).otherwise;
  }]);

  app.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.otherwise('/404');
    $routeProvider.when('/dashboard', {
      template: 'test'
    });
  }]);

  angular.bootstrap(document, ['ng-modular-app']);
})(window.angular);
