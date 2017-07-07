CategoriesService.$inject = [
  '$http'
];

function CategoriesService($http) {
  this.getAll = function () {
    return $http.get('/categories');
  };
}

module.exports = CategoriesService;
