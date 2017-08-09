(function () {
  angular
    .module('app')
    .controller('BuscaController', BuscaController);

  BuscaController.$inject = [
    '$rootScope',
    'categorias',
    'estados'
  ];

  function BuscaController($rootScope, categorias, estados) {
    this.viewState = 'filter';
    this.resultViewState = 'list';
    this.categorias = categorias || [];
    this.estados = estados || [];
    this.filtros = { categoria: {} };
    this.listaResultados = [];

    this.setViewState = function (state) {
      this.viewState = state;
    };

    this.setResultViewState = function (state) {
      this.resultViewState = state;
    };
  }
})();
