const routeConfig = ($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({ enabled: false });

  $routeProvider
    .when('/register', {
      templateUrl: '/views/register',
      controller: 'RegisterController',
      controllerAs: 'registerCtrl',
      resolve: {
        perfis: PerfilService => PerfilService.getAvailable()
      }
    })
    .otherwise({ redirectTo: '/register' });
};

routeConfig.$inject = [
  '$routeProvider',
  '$locationProvider'
];

module.exports = routeConfig;
