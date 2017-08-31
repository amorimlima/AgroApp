(function() {
  angular
    .module('app')
    .controller('PerfilController', PerfilController);

  PerfilController.$inject = [
    '$rootScope',
    'FavoritoService',
    'usuario',
    'oferta'
  ];

  function PerfilController(
    $rootScope,
    FavoritoService,
    usuario,
    oferta
  ) {
    var self = this;
    
    // Models
    self.usuario = usuario;
    self.oferta  = oferta;
    self.loading = true;
    self.isFavorito = false;

    // Métodos
    self.getFavoritoIcon = function (isFavorito) {
      return isFavorito ? 'favorite' : 'favorite_border';
    };

    self.toggleFavorito = function (usuario, isFavorito) {
      self.loading = true;

      if (isFavorito) {
        FavoritoService
          .desfavoritar(usuario)
          .then(function (res) { 
            self.loading = false;
            self.isFavorito = false;
          })
          .catch(function () { self.loading = false; });
      }
      else {
        FavoritoService
          .favoritar(usuario)
          .then(function (favorito) {
            self.loading = false;
            self.isFavorito = true;
          })
          .catch(function () { self.loading = false; });
      }
    };

    self.checarFavorito = function (usuario) {
      self.loading = true;

      FavoritoService
        .checarFavorito(usuario)
        .then(function (isFavorito) {
          self.isFavorito = isFavorito;
          self.loading = false;
        })
        .catch(function () { self.loading = false; });
    };
  }
})();
