(function() {
  angular
    .module('app')
    .service('AutenticacaoService', AutenticacaoService);

    AutenticacaoService.$inject = [
      '$http',
      '$cookies'
    ];

  function AutenticacaoService($http, $cookies) {
    this.authenticate = function (email, senha) {
      return $http
        .post('/email/autenticacao', { email, senha })
        .then(response => response.data);
    }
  }
})();
