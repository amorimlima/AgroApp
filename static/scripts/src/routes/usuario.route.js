(function() {
  angular
    .module('app')
    .config(usuarioRoute);

  usuarioRoute.$inject = [
    '$routeProvider'
  ];

  function usuarioRoute($routeProvider) {
    return $routeProvider
      .when('/meus-produtos', {
        templateUrl: '/views/meus-produtos',
        controller: 'MeusProdutosController',
        controllerAs: 'meusProdutosCtrl'
      });
  }
})();
