import angular from 'angular'

(function() {
  angular
    .module('app')
    .service('PessoaFisicaService', PessoaFisicaService);

  PessoaFisicaService.$inject = [
    '$http'
  ];

  function PessoaFisicaService($http) {
    this.listarPorCpf = function (cpf) {
      return $http
        .get('/pessoa-fisica/' + cpf)
        .then(function (response) { return Promise.resolve(response.data) });
    }
  }
})();
