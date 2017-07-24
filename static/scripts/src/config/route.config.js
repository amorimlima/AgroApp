const routeConfig = ($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({ enabled: false });

  $routeProvider
    .when('/login', {
      templateUrl: '/views/login',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: '/views/register',
      controller: 'RegisterController',
      controllerAs: 'registerCtrl',
      resolve: {
        perfis: function () {
          return PerfilService => PerfilService.getAvailable()
        },
        estados: function () {
          return CidadeEstadoService => CidadeEstadoService.getStates()
        }
      }
    })
    .otherwise({ redirectTo: '/login' });
};

routeConfig.$inject = [
  '$routeProvider',
  '$locationProvider'
];

module.exports = routeConfig;
