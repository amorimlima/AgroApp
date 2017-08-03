(function () {
  angular
    .module('app')
    .config(routesConfig);

  routesConfig.$inject = [
    '$routeProvider'
  ];

  function routesConfig($routeProvider) {
    return $routeProvider
      .when('/', {
        controller: 'InicioController',
        controllerAs: 'loginCtrl',
        templateUrl: '/views/inicio'
      })
      .when('/registro/perfil', {
        controller: 'CadastroPerfilController',
        controllerAs: 'cadastroCtrl',
        templateUrl: '/views/cadastro/perfil'
      })
      .when('/registro/credencial', {
        controller: 'CadastroCredencialController',
        controllerAs: 'cadastroCtrl',
        templateUrl: '/views/cadastro/credencial'
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
      .when('/meus-produtos', {
        controller: 'MeusProdutosController',
        controllerAs: 'meusProdutosCtrl',
        templateUrl: '/views/meus-produtos',
        resolve: {
          produtos: function (ProdutoService) {
            return ProdutoService.listarTodos();
          },
          ofertas: function (UsuarioProdutoService) {
            return UsuarioProdutoService.listarMeusProdutos();
          }
        }
      })
      .otherwise({ redirectTo: '/' });
  };
})();
