module.exports = ($routeProvider) => {
  return $routeProvider
    .when('/registro/perfil', {
      controller: 'CadastroPerfilController',
      controllerAs: 'cadastroCtrl',
      templateUrl: '/views/cadastro/perfil',
      resolve: {
        usuario: function (PersistenceService) {
          return JSON.parse(PersistenceService.getSessionItem('usuario'));
        },
        credencial: function (PercistenceService) {
          return JSON.parse(PercistenceService.getSessionItem('credencial'));
        }
      }
    })
    .when('/registro/credencial', {
      controller: 'CadastroCredencialController',
      controllerAs: 'cadastroCtrl',
      templateUrl: '/views/cadastro/credencial',
      resolve: {
        usuario: function (PersistenceService)  {
          return JSON.parse(PersistenceService.getSessionItem('usuario'));
        },
        credencial: function (PercistenceService) {
          return JSON.parse(PercistenceService.getSessionItem('credencial'));
        },
        email: function (PersistenceService) {
          return JSON.parse(PersistenceService.getSessionItem('email'));
        }
      }
    })
    .when('/registro/pessoa-fisica', {
      controller: 'CadastroPessoaFisicaController',
      controllerAs: 'cadastroCtrl',
      templateUrl: '/views/cadastro/pessoa-fisica'
    })
    .when('/registro/pessoa-juridica', {
      controller: 'CadastroPessoaJuridicaController',
      controllerAs: 'cadastroCtrl',
      templateUrl: '/views/cadastro/pessoa-juridica',
    })
    .when('/registro/contato', {
      controller: 'CadastroContatoController',
      controllerAs: 'cadastroCtrl',
      templateUrl: '/views/cadastro/contato'
    });
};
