(function() {
  angular
    .module('app')
    .service('PessoaJuridicaService', PessoaJuridicaService);

  PessoaJuridicaService.$inject = [
    '$http'
  ];

  function PessoaJuridicaService($http) {
    this.listarPorCnpj = function (cnpj) {
      return $http
        .get('/pessoa-juridica/' + cnpj)
        .then(function (response) { return Promise.resolve(response.data) });
    };
  }
})();
