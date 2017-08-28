(function() {
  angular
    .module('app')
    .controller('FavoritosController', FavoritosController);

  FavoritosController.$inject = [
    'FavoritoService',
    'favoritos'
  ];

  function FavoritosController(FavoritoService, favoritos) {
    var self = this;
    // Models
    self.favoritos = favoritos;

    // Métodos
    self.desfavoritar = function (Favorito) {
      return FavoritoService
        .desfavoritar(Favorito)
        .then(function () { return self.removerDaLista(Favorito); });
    };

    self.removerDaLista = function(Favorito) {
      self.favoritos = self.favoritos
        .filter(function (favorito) { return favorito.id !== Favorito; });
    };
  }
})();
