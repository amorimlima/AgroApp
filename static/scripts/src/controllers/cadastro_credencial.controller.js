(function() {
  angular
    .module('app')
    .controller('CadastroCredencialController', CadastroCredencialController);

  CadastroCredencialController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService'
  ];

  function CadastroCredencialController($rootScope, $location, PersistenceService) {
    // Models
    this.usuario = JSON.parse(PersistenceService
      .getSessionItem('usuario')) || $location.url('/registro/perfil');
    this.email = JSON.parse(PersistenceService
      .getSessionItem('email'))  || { email: '' };

    // Métodos
    this.voltar = function () {
      return $location.url('/registro/perfil');
    };

    this.avancar = function (type) {
      PersistenceService.setSessionItem('usuario', JSON.stringify(this.usuario));
      PersistenceService.setSessionItem('email', JSON.stringify(this.email));
      return $location.url('/registro/' + type);
    };
  }
})();
