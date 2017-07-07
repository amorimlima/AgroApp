ProductsService.$inject = [
  '$http'
];

function ProductsService($http) {
  this.getAll = function () {
    return $http.get('/products');
  };
}

module.exports = ProductsService;
