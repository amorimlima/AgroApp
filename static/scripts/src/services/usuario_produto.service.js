(function() {
  function UsuarioProdutoService($http) {
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
    };

    this.buscarOfertas = function (Produto, estado, cidade) {
      Produto = Produto || { id: '' };
      estado = estado || '';
      cidade = cidade || '';

      return $http
        .get('/oferta/busca?produto=' + Produto.id + '&estado=' + estado + '&cidade=' + cidade)
        .then(function (response) { return Promise.resolve(response.data) });
    };
  }

  UsuarioProdutoService.$inject = [
    '$http'
  ];

  angular
    .module('app')
    .service('UsuarioProdutoService', UsuarioProdutoService);
})();
