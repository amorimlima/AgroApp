(function() {
  angular
    .module('app')
    .service('PerfilService', PerfilService);

  PerfilService.$inject = [
    '$http'
  ];

  function PerfilService($http) {
    this.getAvailable = function () {
      return $http
        .get('/perfil/disponivel')
        .then(function (response) { return response.data; });
    }
  }
})();
