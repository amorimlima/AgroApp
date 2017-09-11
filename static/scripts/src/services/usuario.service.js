(function () {
  angular
    .module('app')
    .service('UsuarioService', UsuarioService);

  UsuarioService.$inject = [
    '$http'
  ];

  function UsuarioService($http) {
    this.getDadosDe = function (Usuario) {
      return $http
        .get('/usuario/' + Usuario)
        .then(function (response) { return response.data; });
    };

    this.buscarDadosDoLogado = function () {
      return $http
        .get('/usuario/logado')
        .then(function (response) { return response.data; });
    };
  }
})();