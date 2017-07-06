routeConfig.$inject = [
  '$routeProvider',
  '$locationProvider'
];

function routeConfig($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({ enabled: false });

  $routeProvider
    .when('/', {
      templateUrl: '/assets/views/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .when('/search', {
      templateUrl: '/assets/views/search.html',
      controller: 'SearchController',
      controllerAs: 'searchCtrl'
    })
    .otherwise({ redirectTo: '/' });
}

module.exports = routeConfig;
