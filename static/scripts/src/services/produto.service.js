import angular from 'angular'

(function () {
  angular
    .module('app')
    .service('ProdutoService', ProdutoService)

  ProdutoService.$inject = [
    '$http'
  ];

  function ProdutoService($http) {
    this.listarTodos = function () {
      return $http
        .get('/produto')
        .then(function (response) { return Promise.resolve(response.data); });
    };
  }
})();
