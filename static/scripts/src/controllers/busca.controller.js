(function () {
  'use strict';

  angular
    .module('app')
    .controller('BuscaController', BuscaController);

  BuscaController.$inject = [
    '$rootScope',
    '$location',
    'UsuarioProdutoService',
    'categorias',
    'estados'
  ];

  function BuscaController(
    $rootScope,
    $location,
    UsuarioProdutoService,
    categorias,
    estados
  ) {
    var self = this;
    var mapaStyles = [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }];
    var optionsMapa = {
      zoom: 13,
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
    self.anunciantes = {};
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

          for (var i = 0; i < self.listaResultados.length; i++) {
            self.anunciantes[self.listaResultados[i].Anunciante.id] = angular.copy(self.listaResultados[i].Anunciante);
          }

          self.iniciarMapa();
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

    self.iniciarMapa = function () {
      if (!self.mapa) {
        self.mapa = new google.maps.Map(document.getElementById('mapa'), optionsMapa);
      }

      for (var i in self.anunciantes) {
        self.setMarker(angular.copy(self.anunciantes[i]));
      }
    };

    self.setMarker = function (anunciante) {
      var marker = new google.maps.Marker({
        map: self.mapa,
        position: new google.maps.LatLng(anunciante.Enderecos[0].latitude, anunciante.Enderecos[0].longitude)
      });

      if (!self.mapa.getCenter()) {
        self.mapa.setCenter(marker.getPosition());
      }

      marker.addListener('click', function () {
        self.mapa.setZoom(15);
        self.mapa.panTo(marker.getPosition());
        self.mostrarDetalhesMarker(marker, anunciante);
      });
    };

    self.mostrarDetalhesMarker = function (marker, anunciante) {
      var content = '<h4>' + $rootScope.PessoaHelper.getNomeDaPessoa(anunciante) + '</h4>';
      var infoWindow = new google.maps.InfoWindow({
        content: content
      });

      infoWindow.open(self.mapa, marker);
    }
  }
})();
