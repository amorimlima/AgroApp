(function() {
  angular
    .module('app')
    .service('EnderecoService', EnderecoService);

  EnderecoService.$inject = [
    '$http'
  ];

  function EnderecoService ($http) {
    this.listarEstados = function () {
      return $http
        .get('/endereco/estado')
        .then(function (response) { return Promise.resolve(response.data) });
    };
  }
})();
