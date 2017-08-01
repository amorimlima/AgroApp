const routes = require('../routes');

const routeConfig = ($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({ enabled: false });

  routes.cadastro($routeProvider);

  $routeProvider
    .when('/', {
      templateUrl: '/views/inicio',
      controller: 'InicioController',
      controllerAs: 'inicioCtrl'
    })
    .when('/meus-produtos', {
      templateUrl: '/views/meus-produtos',
      controller: 'MeusProdutosController',
      controllerAs: 'meusProdutosCtrl'
    })
    .otherwise({ redirectTo: '/' });
};

routeConfig.$inject = [
  '$routeProvider',
  '$locationProvider'
];

module.exports = routeConfig;
