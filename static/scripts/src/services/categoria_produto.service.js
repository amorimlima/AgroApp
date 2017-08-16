(function () {
  angular
    .module('app')
    .service('CategoriaProdutoService', CategoriaProdutoService);

  CategoriaProdutoService.$inject = [
    '$http'
  ];
  
  function CategoriaProdutoService($http) {
    this.getAll = function () {
      return $http
        .get('/categoria')
        .then(function (response) { return response.data; });
    };

    this.getComProdutos = function () {
      return $http
        .get('/categoria/produtos')
        .then(function (response) { return response.data });
    };
  }
})();
