(function () {
  angular
    .module('app')
    .service('CategoriaProdutoService', CategoriaProdutoService);

  CategoriaProdutoService.$inject = [
    '$http'
  ];
  
  function CategoriaProdutoService($http) {
    this.getAll = () => {
      return $http
        .get('/categoria')
        .then(response => response.data);
    }
  }
})();
