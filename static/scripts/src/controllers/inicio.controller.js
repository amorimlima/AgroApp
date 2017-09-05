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
    var self = this;
    
    // Models
    self.email = '';
    self.senha = '';

    // Métodos
    self.login = function () {
      AutenticacaoService
        .autenticar(self.email, self.senha)
        .then(function (response) {
          $cookies.put('session', response.token);
          return $location.url('/meus-produtos');
        })
        .catch(function () { $rootScope.showToast('Usuário ou senha inválidos'); });
    };
  }
})();
