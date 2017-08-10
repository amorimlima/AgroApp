(function() {
  angular
    .module('app')
    .service('AutenticacaoService', AutenticacaoService);

    AutenticacaoService.$inject = [
      '$http',
      '$cookies'
    ];

  function AutenticacaoService($http, $cookies) {
    this.cadastrar = function (payload) {
      return $http
        .post('/autenticacao/cadastrar', payload)
        .then(function (response) { return Promise.resolve(response.data) });
    };
    this.autenticar = function (email, senha) {
      return $http
        .post('/autenticacao', { email: email, senha: senha })
        .then(function (response) { return Promise.resolve({
            token: response.data.token,
            status: response.status
          })
        });
    };
  }
})();
