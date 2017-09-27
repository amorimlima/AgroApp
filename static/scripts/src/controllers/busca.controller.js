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
    var mapaStyles = [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ];
    var optionsMapa = {
      zoom: 8,
      center: new google.maps.LatLng(-23.55, -46.63),
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      styles: mapaStyles
    };

    // Models
    self.viewState  = 'filtros';
    self.categorias = categorias || [];
    self.estados    = estados    || [];
    self.categoria  = 1;
    self.filtros    = { Categoria: 1, estado: '', cidade: '' };
    self.listaResultados = [];
    self.mapa = null;

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

      self.iniciarMapa();
    };

    self.abrirPerfilComOferta = function (perfil, oferta) {
      return $location.url('/perfil/' + perfil + '?oferta=' + oferta);
    };

    self.setCategoriaSelecionada = function (categoria) {
      if (categoria > 0 || categoria <= self.categorias.length + 1) {
        self.categoria = categoria;
      }
    };

    self.iniciarMapa = function () {
      if (!self.mapa) {
        self.mapa = new google.maps.Map(document.getElementById('mapa'), optionsMapa);
      }
      document.getElementById('mapa').style.height = '100%';
    };
  }
})();
