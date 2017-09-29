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
      zoom: 12,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      styles: mapaStyles
    };

    // Models
    self.viewState  = 'filtros';
    self.resultViewState = 'lista';
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

    self.setResultViewState = function (state) {
      self.resultViewState = state;

      if (state === 'mapa') {
        self.iniciarMapa();
      }
    }

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

      window.setTimeout(function () {
        google.maps.event.trigger(self.mapa,'resize');

        for (var i in self.anunciantes) {
          self.mapa.setCenter(self.anunciantes[i].marker.getPosition());
          break;
        }
      }, 50);
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
        self.mostrarDetalhesMarker(marker, anunciante);
        self.mapa.panTo(marker.getPosition());
        self.mapa.panBy(0, -70);
      });

      anunciante.marker = marker;
    };

    self.mostrarDetalhesMarker = function (marker, anunciante) {
      var infoWindow = new google.maps.InfoWindow({
        content: self.templateInfoWindow(anunciante),
        disableAutoPan: true
      });

      infoWindow.addListener('closeclick', function () {
        self.mapa.setZoom(12);
      });

      infoWindow.open(self.mapa, marker);
    };

    self.templateInfoWindow = function (anunciante) {
      var PessoaHelper = $rootScope.PessoaHelper;

      return (
        '<h4>' + PessoaHelper.getNomeDaPessoa(anunciante) + '</h4>' +
        '<p>' + PessoaHelper.getEnderecoCompleto(anunciante, anunciante.Enderecos[0], false) + '</p>' +
        '<p>' +
          '<a href="tel:+55' + anunciante.Telefones[0].ddd.toString() + anunciante.Telefones[0].numero.toString()+ '">' +
            PessoaHelper.getNumeroTelefone(anunciante) +
          '</a><br/>' +
          '<a href="mailto:' + anunciante.Emails[0].email + '">' +
            anunciante.Emails[0].email +
          '</a>' +
        '</p>' +
        '<p><a href="#/perfil/' + anunciante.id + '">Ver ofertas</a></p>'
      );
    };
  }
})();
