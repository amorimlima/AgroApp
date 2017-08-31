(function() {
  angular
    .module('app')
    .controller('PerfilController', PerfilController);

  PerfilController.$inject = [
    '$rootScope',
    '$location',
    'UsuarioProdutoService',
    'FavoritoService',
    'usuario'
  ];

  function PerfilController(
    $rootScope,
    $location,
    UsuarioProdutoService,
    FavoritoService,
    usuario
  ) {
    var self = this;
    
    // Models
    self.usuario = usuario;
    self.loading = true;
    self.oferta  = null; 
    self.ofertas = [];
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

    self.carregarOferta = function () {
      var id_oferta = $location.search().oferta;
      self.loading = true;

      if (id_oferta) {
        UsuarioProdutoService
          .getOferta(id_oferta)
          .then(function (oferta) {
            self.loading = false;
            self.oferta  = oferta;
          })
          .catch(function () { self.loading = false; });
      }
      else {
        self.loading = false;
      }
    };

    self.carregarOfertasDe = function (usuario) {
      self.loading = true;

      UsuarioProdutoService
      .listarProdutosDe(usuario)
      .then(function (ofertas) {
        console.log(ofertas)
        self.ofertas = self.oferta
          ? ofertas.filter(function (oferta) { return oferta.id !== self.oferta.id })
          : ofertas;

        self.loading = false;
      })
      .catch(function () { self.loading = false; });
    };
  }
})();
