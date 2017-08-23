(function() {
  angular
    .module('app')
    .service('FavoritoService', FavoritoService);
  
  FavoritoService.$inject = [
    '$http'
  ];

  function FavoritoService($http) {
    this.checarFavorito = function (usuario) {
      return $http
        .get('/favorito/' + usuario)
        .then(function (response) { return Promise.resolve(response.data ? true : false) });
    }
    this.favoritar = function (usuario) {
      return $http
        .post('/favorito', { usuario: usuario })
        .then(function (response) { return Promise.resolve(response.data) });
    };

    this.desfavoritar = function (usuario) {
      return $http
        .delete('/favorito/' + usuario)
        .then(function (response) { return Promise.resolve(response.data) });
    };
  }
})();
