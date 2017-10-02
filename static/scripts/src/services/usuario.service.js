import angular from 'angular'

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

    this.buscarDadosDoLogado = function (token) {
      return $http
        .get('/usuario/logado?token=' + token)
        .then(function (response) { return response.data; });
    };
  }
})();