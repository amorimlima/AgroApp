'use strict'

import angular from 'angular'

class MeusProdutosController {
  constructor($rootScope, $mdDialog, UsuarioProdutoService, produtos, ofertas) {
    this.rootScope = $rootScope
    this.dialog = $mdDialog
    this.ofertaService = UsuarioProdutoService
    this.produtosDisponiveis = produtos
    this.ofertas = ofertas

    this.oferta = {}
    this.categoria = null
    this.textoBusca = ''
    this.mensagemStatus = 'Nenhum produto encontrado.';
  }

  static get $inject() {
    return ['$rootScope', '$mdDialog', 'UsuarioProdutoService', 'produtos', 'ofertas']
  }

  abrirFormulario(oferta) {
    if (!oferta) {
      this.oferta = {};
      this.categoria = null;
    }
    else {
      this.oferta = angular.copy(oferta);
      this.categoria = oferta.Anuncio.Categoria;
      this.oferta.data_inicio = new Date(this.oferta.data_inicio);
      this.oferta.data_fim = new Date(this.oferta.data_fim);
    }

    this.dialog.show({
      clickOutsideToClose: true,
      contentElement: document.getElementById('produto_form'),
      parent: document.getElementsByTagName('body')[0]
    });
  }

  produtosFiltrados(categoria) {
    if (!categoria) {
      return [ { id: null, nome: 'Selecione uma categoria' } ];
    }

    return this.produtosDisponiveis
      .filter(produto => produto.Categoria === categoria);
  }

  cancelar() {
    this.produto = {};
    return this.dialog.hide();
  };

  salvar() {
    this.ofertas = [];

    return this.ofertaService
      .cadastrarOferta(this.oferta)
      .then(oferta => {
        this.dialog.hide();
        this.listarMeusProdutos();
      });
  };

  produtosPorCategoria(categoria) {
    return this.produtosDisponiveis
      .filter(produto => produto.Categoria === categoria);
  };

  getFormatedDate(data) {
    var date = new Date(data);
    var formated = '';
    formated += date.getDate() < 10 ? '0' + date.getDate() + '/' : date.getDate() + '/';
    formated += (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '/' : (date.getMonth() + 1) + '/';
    formated += date.getFullYear();

    return formated;
  };

  abrirConfirmacaoExclusaoDe(oferta) {
    var dialog = this.dialog.confirm()
      .title('Excluir oferta?')
      .textContent('Essa ação não pode ser desfeita.')
      .ok('Excluir')
      .cancel('Cancelar');
    this.oferta = angular.copy(oferta);

    this.dialog.show(dialog)
      .then(() => this.confirmarExclusao(oferta.id))
      .catch(() => {});
  };

  listarMeusProdutos() {
    return this.ofertaService
      .listarMeusProdutos()
      .then(ofertas => { this.ofertas = ofertas });
  };

  confirmarExclusao(id) {
    return this.ofertaService
      .deletarOferta(id)
      .then(function () { this.listarMeusProdutos() });
  }
}

angular
  .module('app')
  .controller('MeusProdutosController', MeusProdutosController);
