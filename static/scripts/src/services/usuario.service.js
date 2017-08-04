(function () {
  angular
    .module('app')
    .service('UsuarioService', UsuarioService);

  UsuarioService.$inject = [
    '$http'
  ];

  function UsuarioService($http) {
    this.register = function (payload) {
      return $http
        .post('/usuario/novo', payload)
        .then(function (response) { return response.data; });
    }
  }

})();
