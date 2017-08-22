(function () {
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
    self.filtros    = { Categoria: 1, estado: '', cidade: '' };
    self.listaResultados = [];
    self.isBuscandoDados = false;

    // Métodos
    self.setViewState = function (state) {
      self.viewState = state;
    };

    self.carregarOfertas = function (filtros) {
      self.isBuscandoDados = true;
      self.listaResultados = [];
      self.viewState = 'resultados';

      UsuarioProdutoService
        .buscarOfertas(filtros.Produto, filtros.estado, filtros.cidade)
        .then(function (ofertas) {
          self.isBuscandoDados = false;
          self.listaResultados = angular.copy(ofertas);
        });
    };

    self.abrirOferta = function (oferta) {
      return $location.url('/oferta/' + oferta);
    };
  }
})();
