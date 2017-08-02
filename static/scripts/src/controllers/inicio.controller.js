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

  function InicioController($rootScope, $location, AutenticacaoService, PersistenceService) {
    this.email = '';
    this.senha = '';

    this.login = function () {
      this.auth
        .authenticate(this.email, this.senha)
        .then(function (token) {
          this.storage.setPreference('token', token);
          return this.$location.url('/meus-produtos');
        })
        .catch(function () {
          console.log('Erro ao logar');
        });
    }
  }
})();