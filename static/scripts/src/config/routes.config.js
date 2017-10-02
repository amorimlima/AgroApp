import angular from 'angular'

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
        controllerAs: 'ctrl',
        templateUrl: '/views/cadastro/credencial'
      })
      .when('/registro/pessoa-fisica', {
        controller: 'CadastroPessoaFisicaController',
        controllerAs: 'ctrl',
        templateUrl: '/views/cadastro/pessoa-fisica'
      })
      .when('/registro/pessoa-juridica', {
        controller: 'CadastroPessoaJuridicaController',
        controllerAs: 'ctrl',
        templateUrl: '/views/cadastro/pessoa-juridica',
      })
      .when('/registro/contato', {
        controller: 'CadastroContatoController',
        controllerAs: 'ctrl',
        templateUrl: '/views/cadastro/contato',
        resolve: {
          estados: ['EnderecoService', function (EnderecoService) {
            return EnderecoService.listarEstados();
          }]
        }
      })
      .when('/meus-produtos', {
        controller: 'MeusProdutosController',
        controllerAs: 'meusProdutosCtrl',
        templateUrl: '/views/meus-produtos',
        requireAuth: true,
        resolve: {
          produtos: ['ProdutoService', function (ProdutoService) {
            return ProdutoService.listarTodos();
          }],
          ofertas: ['UsuarioProdutoService', function (UsuarioProdutoService) {
            return UsuarioProdutoService.listarMeusProdutos();
          }]
        }
      })
      .when('/busca', {
        controller: 'BuscaController',
        controllerAs: 'ctrl',
        templateUrl: '/views/busca',
        requireAuth: true,
        resolve: {
          categorias: ['CategoriaProdutoService', function (CategoriaProdutoService) {
            return CategoriaProdutoService.getComProdutos();
          }],
          estados: ['EnderecoService', function (EnderecoService) {
            return EnderecoService.listarEstados();
          }]
        }
      })
      .when('/dados-cadastrais', {
        controller: 'MeusDadosController',
        controllerAs: 'ctrl',
        templateUrl: '/views/dados-cadastrais',
        requireAuth: true,
        resolve: {
          usuario: ['UsuarioService', '$cookies', function (UsuarioService, $cookies) {
            return UsuarioService.buscarDadosDoLogado($cookies.get('session'));
          }]
        }
      })
      .when('/perfil/:usuario', {
        controller: 'PerfilController',
        controllerAs: 'ctrl',
        templateUrl: '/views/perfil',
        requireAuth: true,
        resolve: {
          usuario: ['UsuarioService', '$route', function (UsuarioService, $route) {
            return UsuarioService.getDadosDe($route.current.params.usuario);
          }]
        }
      })
      .when('/favoritos', {
        controller: 'FavoritosController',
        controllerAs: 'ctrl',
        templateUrl: '/views/favoritos',
        requireAuth: true,
        resolve: {
          favoritos: ['FavoritoService', function(FavoritoService) {
            return FavoritoService.listarMeusFavoritos();
          }]
        }
      })
      .otherwise({ redirectTo: '/' });
  }
})();
