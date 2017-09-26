(function () {
  'use strict';

  angular
    .module('app')
    .controller('BuscaController', BuscaController);

  BuscaController.$inject = [
    '$location',
    'UsuarioProdutoService',
    'categorias',
    'estados'
  ];

  function BuscaController(
    $location,
    UsuarioProdutoService,
    categorias,
    estados
  ) {
    var self = this;

    // Models
    self.viewState  = 'filtros';
    self.categorias = categorias || [];
    self.estados    = estados    || [];
    self.categoria  = 1;
    self.filtros    = { Categoria: 1, estado: '', cidade: '' };
    self.listaResultados = [];

    // Métodos
    self.setViewState = function (state) {
      self.viewState = state;
    };

    self.carregarOfertas = function (filtros) {
      self.listaResultados = [];
      self.viewState = 'resultados';

      UsuarioProdutoService
        .buscarOfertas(filtros.Produto, filtros.estado, filtros.cidade)
        .then(function (ofertas) {
          self.listaResultados = angular.copy(ofertas);
        });
    };

    self.abrirPerfilComOferta = function (perfil, oferta) {
      return $location.url('/perfil/' + perfil + '?oferta=' + oferta);
    };

    self.setCategoriaSelecionada = function (categoria) {
      if (categoria > 0 || categoria <= self.categorias.length + 1) {
        self.categoria = categoria;
      }
    };
  }
})();
