(function() {
  angular
    .module('app')
    .controller('InicioController', InicioController);

  InicioController.$inject = [
    '$rootScope',
    '$location',
    'AutenticacaoService',
    'PersistenceService'
  ];

  function InicioController(
    $rootScope, 
    $location, 
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
          PersistenceService.setPreference('token', token.token);
          return $location.url('/meus-produtos');
        })
        .catch(function (erro) {
          console.log(erro);
        });
    };
  }
})();