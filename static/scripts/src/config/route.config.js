routeConfig.$inject = [
  '$routeProvider',
  '$locationProvider'
];

function routeConfig($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({ enabled: false });

  $routeProvider
    .when('/', {
      templateUrl: '/views/login',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .when('/search', {
      templateUrl: '/views/search',
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
