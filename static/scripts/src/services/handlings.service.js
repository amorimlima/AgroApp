HandlingsService.$inject = [
  '$http'
];

function HandlingsService($http) {
  this.getAll = function () {
    return $http.get('/handlings');
  };
}

module.exports = HandlingsService;
