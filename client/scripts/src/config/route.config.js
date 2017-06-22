(function () {
  angular
    .module('app')
    .config(routeConfig);

  routeConfig.$inject = [
    '$routeProvider',
    '$locationProvider'
  ];

  function routeConfig($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({ enabled: true, requireBase: false });

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .otherwise({redirectTo: '/'});
  }
})();
