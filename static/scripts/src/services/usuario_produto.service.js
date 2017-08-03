(function() {
  function UsuarioProdutoService($http, PersistenceService) {
    this.listarMeusProdutos = function () {
      return $http
        .get('/oferta/meus-produtos', {
          headers: { 'Authorization': PersistenceService.getPreference('token') }
        })
        .then(function (response) { return Promise.resolve(response.data) });
    };

    this.cadastrarOferta = function (oferta) {
      return $http
        .post('/oferta', oferta, {
          headers: { 'Authorization': PersistenceService.getPreference('token') }
        })
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
