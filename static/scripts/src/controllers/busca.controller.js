'use strict'

import angular from 'angular'

const mapaStyles = [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }]
const optionsMapa = { zoom: 12, mapTypeId: 'roadmap', disableDefaultUI: true, zoomControl: true, styles: mapaStyles }

class BuscaController {
  constructor($rootScope, $location, UsuarioProdutoService, EnderecoService, categorias = [], estados = []) {
    this.root = $rootScope
    this.location = $location
    this.ofertaService = UsuarioProdutoService
    this.enderecoService = EnderecoService
    this.categorias = categorias
    this.estados = estados
    this.cidades = []

    this.resultViewState = 'lista'
    this.viewState = 'filtros'
    this.categoria = null
    this.filtros = { Categoria: 1, estado: '', cidade: '' }
    this.listaResultados = []
    this.anunciantes = []
    this.mapa = null
  }

  static get $inject() {
    return ['$rootScope', '$location', 'UsuarioProdutoService', 'EnderecoService', 'categorias', 'estados']
  }

  getEstiloTilePorCategoria(categoria) {
    if (this.categoria === categoria)
      return { 'background-color': '#f4f4f4', 'border': '1px solid #f0f0f0' }
    else
      return { 'background-color': 'none', 'border': '1px solid #f4f4f4' }
  }

  setViewState(state) {
    this.viewState = state
  }

  setResultViewState(state) {
    this.resultViewState = state

    if (state === 'mapa') {
      this.iniciarMapa()
    }
  }

  buscarCidades(estado) {
    this.cidades = []
    this.enderecoService
      .listarCidadesDe(estado)
      .then(cidades => { this.cidades = cidades })
      .catch(err => this.root.showToast(`Não foi possível listar as cidades de ${estado}`))
  }

  carregarOfertas(filtros) {
    this.listaResultados = []
    this.viewState = 'resultados'

    this.ofertaService
      .buscarOfertas(filtros.searchText, filtros.estado, filtros.cidade)
      .then(ofertas => {
        this.listaResultados = Array.from(ofertas)

        this.listaResultados.forEach(oferta => {
          this.anunciantes[oferta.Anunciante.id] = Object.assign({}, oferta.Anunciante)
        })
      })
  }

  atualizarResultados(viewState, filtros) {
    if (viewState === 'resultados') {
      this.carregarOfertas(filtros)
    }
  }

  abrirPerfilComOferta(perfil, oferta) {
    return this.location.url(`/perfil/${perfil}?oferta=${oferta}`)
  }

  alternarCategoriaSelecionada(categoria) {
    if (categoria !== this.categoria)
      this.categoria = categoria
    else
      this.categoria = null
  }

  listarProdutosDaCategoria(categoria) {
    if (categoria)
      return this.categorias[categoria - 1].Produtos
    else
      return this.categorias.reduce((produtos, categoria) => produtos.concat(categoria.Produtos), [])
  }

  iniciarMapa() {
    if (!this.mapa) {
      this.mapa = new google.maps.Map(document.getElementById('mapa'), optionsMapa)
    }

    this.anunciantes.forEach(anunciante => this.setMarker(Object.assign({}, anunciante)))
    window.setTimeout(() => google.maps.event.trigger(this.mapa, 'resize'), 50)
  }

  setMarker(anunciante) {
    const marker = new google.maps.Marker({
      map: this.mapa,
      position: new google.maps.LatLng(anunciante.Enderecos[0].latitude, anunciante.Enderecos[0].longitude)
    })

    if (!this.mapa.getCenter()) {
      this.mapa.setCenter(marker.getPosition());
    }

    marker.addListener('click', () => {
      this.mapa.setZoom(15);
      this.mostrarDetalhesMarker(marker, anunciante);
      this.mapa.panTo(marker.getPosition());
      this.mapa.panBy(0, -70);
    });

    Object.assign(anunciante, { marker })
  }

  mostrarDetalhesMarker(marker, anunciante) {
    const infoWindow = new google.maps.InfoWindow({
      content: this.templateInfoWindow(anunciante),
      disableAutoPan: true
    });

    infoWindow.addListener('closeclick', () => this.mapa.setZoom(12))
    infoWindow.open(this.mapa, marker)
  }

  templateInfoWindow(anunciante) {
    const { PessoaHelper } = this.root

    return `
      <h4>${ PessoaHelper.getNomeDaPessoa(anunciante) }</h4>
      <p>${ PessoaHelper.getEnderecoCompleto(anunciante, anunciante.Enderecos[0], false) }</p>
      <p>
        <a href="tel:+55${ anunciante.Telefones[0].ddd + anunciante.Telefones[0].numero }">
          ${ PessoaHelper.getNumeroTelefone(anunciante) }
        </a><br/>
        <a href="mailto:${ anunciante.Emails[0].email }">
          ${ anunciante.Emails[0].email }
        </a>
      </p>
      <p><a href="#/perfil/${ anunciante.id }">Ver ofertas</a></p>
    `
  }
}

angular
  .module('app')
  .controller('BuscaController', BuscaController)
