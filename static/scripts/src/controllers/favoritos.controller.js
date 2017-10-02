import angular from 'angular'

(function() {
  angular
    .module('app')
    .controller('FavoritosController', FavoritosController);

  FavoritosController.$inject = [
    '$rootScope',
    '$location',
    'FavoritoService',
    'favoritos'
  ];

  function FavoritosController(
    $rootScope,
    $location,
    FavoritoService,
    favoritos
  ) {
    var self = this;

    // Models
    self.favoritos = favoritos;

    // Métodos
    self.desfavoritar = function (Favorito) {
      return FavoritoService
        .desfavoritar(Favorito)
        .then(function () { return self.removerDaLista(Favorito); });
    };

    self.removerDaLista = function (Favorito) {
      self.favoritos = self.favoritos
        .filter(function (favorito) { return favorito.id !== Favorito; });
    };

    self.acessarPerfilDe = function (Favorito) {
      $location.url('/perfil/' + Favorito)
    };
  }
})();
