const routeConfig = ($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({ enabled: false });

  $routeProvider
    .when('/', {
      templateUrl: '/views/login',
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    })
    .when('/registro/perfil', {
      templateUrl: '/views/register/profile',
      controller: 'PerfilRegisterController',
      controllerAs: 'registerCtrl',
      resolve: {
        tipoPessoa: function (LocalPersistanceService) {
          return LocalPersistanceService.getSessionItem('tipo');
        }
      }
    })
    .when('/registro/credencial', {
      templateUrl: '/views/register/credential',
      controller: 'CredentialRegisterController',
      controllerAs: 'registerCtrl',
      resolve: {
        tipoPessoa: function (LocalPersistanceService) {
          return LocalPersistanceService.getSessionItem('tipo');
        }
      }
    })
    .when('/registro/dados-pessoais', {
      templateUrl: '/views/register/personal-data',
      controller: 'PersonalDataRegisterController',
      controllerAs: 'registerCtrl',
    })
    .when('/registro/dados-empresariais', {
      templateUrl: '/views/register/company-data',
      controller: 'CompanyDataRegisterController',
      controllerAs: 'registerCtrl'
    })
    .when('/registro/contato', {
      templateUrl: '/views/register/contact',
      controller: 'ContactRegisterController',
      controllerAs: 'registerCtrl'
    })
    .otherwise({ redirectTo: '/' });
};

routeConfig.$inject = [
  '$routeProvider',
  '$locationProvider'
];

module.exports = routeConfig;
