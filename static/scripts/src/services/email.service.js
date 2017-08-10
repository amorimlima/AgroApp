(function() {
  angular
    .module('app')
    .service('EmailService', EmailService);

  EmailService.$inject = [
    '$http'
  ];

  function EmailService($http) {
    this.listarPorEndereco = function (endereco) {
      return $http
        .get('/email/' + endereco)
        .then(function (response) { return Promise.resolve(response.data) })
        .catch(function (error) { return Promise.reject({ mensagem: 'Erro inesperado' }) });
    };
  }
})();
