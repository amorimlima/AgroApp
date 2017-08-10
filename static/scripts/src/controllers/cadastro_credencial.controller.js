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
    var vm = this;
    // Models
    vm.usuario = JSON.parse(PersistenceService
      .getSessionItem('usuario')) || $location.url('/registro/perfil');
    vm.email = JSON.parse(PersistenceService
      .getSessionItem('email'))  || { email: '' };

    vm.emailEmUso = false;

    // Métodos
    vm.voltar = function () {
      return $location.url('/registro/perfil');
    };

    vm.setForm = function (form) {
      vm.form = form;
    };

    vm.verificarEmail = function (email) {
      EmailService
        .listarPorEndereco(email.$modelValue)
        .then(function (response) {
          if (response) {
            email.$error.em_uso = true;
            email.$valid = false;
            email.$invalid = true;
          }
          else {
            email.$error.em_uso = false;
            email.$valid = true;
            email.$invalid = false;
          }
        });
    }

    vm.avancar = function (type) {
      PersistenceService.setSessionItem('usuario', JSON.stringify(this.usuario));
      PersistenceService.setSessionItem('email', JSON.stringify(this.email));
      return $location.url('/registro/' + type);
    };
  }
})();
