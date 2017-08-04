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
    }
  }
})();
