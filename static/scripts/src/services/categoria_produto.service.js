class CategoriaProdutoService {
  constructor($http) {
    this.request = $http;
  }

  getAll() {
    return this.request
      .get('/categoria')
      .then((response) => response.data);
  }
}

module.exports = CategoriaProdutoService;
