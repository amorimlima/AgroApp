import angular from 'angular'

(function() {
  angular
    .module('app')
    .service('UsuarioProdutoService', UsuarioProdutoService);

  UsuarioProdutoService.$inject = [
    '$http'
  ];

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

    this.buscarOfertas = function (produto, estado, cidade) {
      produto = produto || '';
      estado  = estado  || '';
      cidade  = cidade  || '';

      return $http
        .get('/oferta/busca?produto=' + produto + '&estado=' + estado + '&cidade=' + cidade)
        .then(function (response) { return Promise.resolve(response.data); });
    };

    this.getOferta = function (id) {
      return $http
        .get('/oferta/' + id)
        .then(function (response) { return Promise.resolve(response.data); });
    };

    this.listarProdutosDe = function (id) {
      return $http
        .get('/oferta/por-usuario/' + id)
        .then(function (response) { return Promise.resolve(response.data); });
    } 
  }
})();
