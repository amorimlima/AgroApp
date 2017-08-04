(function() {
  function UsuarioProdutoService($http, PersistenceService) {
    this.listarMeusProdutos = function () {
      return $http
        .get('/oferta/meus-produtos')
        .then(function (response) { return Promise.resolve(response.data) });
    };

    this.cadastrarOferta = function (oferta) {
      return $http
        .post('/oferta', oferta)
        .then(function (response) { return Promise.resolve(response.data) });
    };

    this.deletarOferta = function (id) {
      return $http
        .delete('/oferta/' + id)
        .then(function (response) { return Promise.resolve(response.data) });
    }
  }

  UsuarioProdutoService.$inject = [
    '$http',
    'PersistenceService'
  ];

  angular
    .module('app')
    .service('UsuarioProdutoService', UsuarioProdutoService);
})();
