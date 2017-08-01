(function() {
  function UsuarioProdutoService($http) {
    this.createOffer = (offer) => {
      return $http
        .post('/produto/oferta', offer)
        .then(response => response.data);
    }
  }

  UsuarioProdutoService.$inject = [
    '$http'
  ];

  angular
    .module('app')
    .service('UsuarioProdutoService', UsuarioProdutoService);
})();
