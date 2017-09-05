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
    self.oferta  = null; 
    self.ofertas = [];
    self.isFavorito = false;

    // Métodos
    self.getFavoritoIcon = function (isFavorito) {
      return isFavorito ? 'favorite' : 'favorite_border';
    };

    self.toggleFavorito = function (usuario, isFavorito) {
      if (isFavorito) {
        FavoritoService
          .desfavoritar(usuario)
          .then(function (res) { self.isFavorito = false; })
          .catch(function () { $rootScope.showToast('Não foi possível desfavoritar o usuário'); });
      }
      else {
        FavoritoService
          .favoritar(usuario)
          .then(function (favorito) { self.isFavorito = true; })
          .catch(function () { $rootScope.showToast('Não foi possível favoritar o usuário'); });
      }
    };

    self.checarFavorito = function (usuario) {
      FavoritoService
        .checarFavorito(usuario)
        .then(function (isFavorito) { self.isFavorito = isFavorito; })
        .catch(function () { /* TODO: Desabilitar o botão de favorito */ });
    };

    self.carregarOferta = function () {
      var id_oferta = $location.search().oferta;

      if (id_oferta) {
        UsuarioProdutoService
          .getOferta(id_oferta)
          .then(function (oferta) { self.oferta = oferta; })
          .catch(function () { $rootScope.showToast('Não foi possível carregar a oferta'); });
      }
    };

    self.carregarOfertasDe = function (usuario) {
      UsuarioProdutoService
        .listarProdutosDe(usuario)
        .then(function (ofertas) {
          self.ofertas = self.oferta
            ? ofertas.filter(function (oferta) { return oferta.id !== self.oferta.id })
            : ofertas;
        })
        .catch(function () {
          $rootScope.showToast('Não foi possível carregar as ofertas do usuário');
        });
    };
  }
})();
