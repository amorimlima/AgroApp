(function () {
  angular
    .module('app')
    .service('ProductsService', ProductsService);

  ProductsService.$inject = [
    '$http'
  ];
  function ProductsService($http) {
    this.getAll = function () {
      return $http.get('/products');
    };
  }
})();
