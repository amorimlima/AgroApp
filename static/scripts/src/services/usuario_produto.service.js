class UsuarioProdutoService {
  constructor($http) {
    this.request = $http;
  }

  createOffer(offer) {
    return this.request
      .post('/produto/oferta', offer)
      .then(response => response.data);
  }
}

UsuarioProdutoService.$inject = ['$http'];

module.exports = UsuarioProdutoService;
