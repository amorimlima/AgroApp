(function () {
  angular
    .module('app')
    .config(cadastroRoute);

  cadastroRoute.$inject = [
    '$routeProvider'
  ];

  function cadastroRoute($routeProvider) {
    return $routeProvider
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
      .when('/registro/contato', {
        controller: 'CadastroContatoController',
        controllerAs: 'cadastroCtrl',
        templateUrl: '/views/cadastro/contato'
      });
  };
})();
