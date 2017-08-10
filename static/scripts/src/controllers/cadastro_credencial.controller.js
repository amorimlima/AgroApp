(function() {
  angular
    .module('app')
    .controller('CadastroCredencialController', CadastroCredencialController);

  CadastroCredencialController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService',
    'EmailService'
  ];

  function CadastroCredencialController($rootScope, $location, PersistenceService, EmailService) {
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
      EmailService
        .listarPorEndereco(this.email.email)
        .then(function (email) {
          if (email) {
            PersistenceService.setSessionItem('usuario', JSON.stringify(this.usuario));
            PersistenceService.setSessionItem('email', JSON.stringify(this.email));
            return $location.url('/registro/' + type);
          }
          else {
            console.log('Email em uso');
          }
        })
      
    };
  }
})();
