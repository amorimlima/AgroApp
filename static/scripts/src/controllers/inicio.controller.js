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
          $location.url('/meus-produtos');
          return $rootScope.$broadcast('login');
        })
        .catch(function () { $rootScope.showToast('Usuário ou senha inválidos'); });
    };
  }
})();