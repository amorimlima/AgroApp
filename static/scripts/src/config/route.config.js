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
      controllerAs: 'searchCtrl',
      resolve: {
        categories: function (CategoriesService) {
          return CategoriesService.getAll();
        },
        handlings: function (HandlingsService) {
          return HandlingsService.getAll();
        },
        products: function (ProductsService) {
          return ProductsService.getAll();
        }
      }
    })
    .otherwise({ redirectTo: '/' });
}

module.exports = routeConfig;
