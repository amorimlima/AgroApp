(function() {
  angular
    .module('app')
    .controller('OfertaController', OfertaController);

  OfertaController.$inject = [
    'FavoritoService',
    'oferta'
  ];

  function OfertaController(FavoritoService, oferta) {
    var self = this;
    
    // Models
    self.oferta  = oferta;
    self.loading = true;
    self.isFavorito = false;

    // Métodos
    self.getFavoritoIcon = function (isFavorito) {
      return isFavorito ? 'favorite' : 'favorite_border';
    };

    self.toggleFavorito = function (usuario) {
      return console.log('Toggle favorito');
    };

    self.checarFavorito = function (usuario) {
      self.loading = true;

      FavoritoService
        .checarFavorito(usuario)
        .then(function (isFavorito) {
          self.isFavorito = isFavorito;
          // self.loading = false;
        })
        .catch(function (err) {
          self.loading = false;
        });
    };
  }
})();
