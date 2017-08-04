(function() {
  angular
    .module('app')
    .controller('InicioController', InicioController);

  InicioController.$inject = [
    '$rootScope',
    '$location',
    '$cookies',
    'AutenticacaoService',
    'PersistenceService'
  ];

  function InicioController(
    $rootScope, 
    $location,
    $cookies,
    AutenticacaoService, 
    PersistenceService
  ) {
    // Models
    this.email = '';
    this.senha = '';

    // Métodos
    this.login = function () {
      AutenticacaoService
        .autenticar(this.email, this.senha)
        .then(function (token) {
          $cookies.put('session', token.token);
          return $location.url('/meus-produtos');
        })
        .catch(function (erro) {
          console.log(erro);
        });
    };
  }
})();
