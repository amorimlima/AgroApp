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
          .then(function (res) { self.isFavorito = false; })
          .catch(function () { // TODO: Toast exibindo feedback });
      }
      else {
        FavoritoService
          .favoritar(usuario)
          .then(function (favorito) {
            self.isFavorito = true;
          })
          .catch(function () { // TODO: Toast exibindo feedback });
      }
    };

    self.checarFavorito = function (usuario) {
      self.loading = true;

      FavoritoService
        .checarFavorito(usuario)
        .then(function (isFavorito) { self.isFavorito = isFavorito; })
        .catch(function () { // TODO: Toast exibindo feedback });
    };

    self.carregarOferta = function () {
      var id_oferta = $location.search().oferta;

      if (id_oferta) {
        UsuarioProdutoService
          .getOferta(id_oferta)
          .then(function (oferta) { self.oferta = oferta; })
          .catch(function () { // TODO: Toast exibindo feedback });
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
        .catch(function () { // TODO: Toast exibindo feedback });
    };
  }
})();
