(function() {
  angular
    .module('app')
    .controller('CadastroPerfilController', CadastroPerfilController);

  CadastroPerfilController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService'
  ];

  function CadastroPerfilController(
    $rootScope,
    $location,
    PersistenceService
  ) {
    // Models
    this.usuario = JSON.parse(PersistenceService
      .getSessionItem('usuario')) || { tipo: '' };
    this.credencial = JSON.parse(PersistenceService
      .getSessionItem('usuario')) || { perfil: null, senha: '' };
    
    // Métodos
    this.voltar = function () {
      PersistenceService.clearSessionItems();
      return $location.url('/');  
    };

    this.avancar = function () {
      PersistenceService.setSessionItem('usuario', JSON.stringify(this.usuario));
      PersistenceService.setSessionItem('credencial', JSON.stringify(this.credencial));

      return $location.url('/registro/credencial');
    };
  }
})();