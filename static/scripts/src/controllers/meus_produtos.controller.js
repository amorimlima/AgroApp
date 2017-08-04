(function() {
  angular
    .module('app')
    .controller('MeusProdutosController', MeusProdutosController);

  MeusProdutosController.$inject = [
    '$rootScope',
    '$mdDialog',
    'CategoriaProdutoService',
    'ProdutoService',
    'UsuarioProdutoService',
    'produtos',
    'ofertas'
  ];

  var self = null;

  function MeusProdutosController(
    $rootScope,
    $mdDialog,
    CategoriaProdutoService,
    ProdutoService,
    UsuarioProdutoService,
    produtos,
    ofertas
  ) {
    // Models
    this.oferta = {};
    this.ofertas = ofertas;
    this.produtosDisponiveis = produtos;
    this.categoria = null;
    this.textoBusca = '';
    this.mensagemStatus = 'Nenhum produto encontrado.';

    // Métodos
    this.abrirFormulario = function (oferta) {
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

      $mdDialog.show({
        contentElement: document.getElementById('produto_form'),
        parent: document.getElementsByTagName('body')[0]
      });
    };

    this.produtosFiltrados = function (categoria) {
      if (!categoria) {
        return [ { id: null, nome: 'Selecione uma categoria' } ];
      }

      return this.produtosDisponiveis
        .filter(function (produto) { return produto.Categoria === categoria });
    }

    this.cancelar = function () {
      this.produto = {};
      return $mdDialog.hide();
    };

    this.salvar = function () {
      var self = this;
      this.ofertas = [];

      return UsuarioProdutoService
        .cadastrarOferta(this.oferta)
        .then(function (oferta) {
          $mdDialog.hide();
          self.listarMeusProdutos();
        });
    };

    this.produtosPorCategoria = function (categoria) {
      return this.produtosDisponiveis
        .filter(function (produto) {
          return produto.Categoria === categoria;
        });
    };

    this.getFormatedDate = function (data) {
      var date = new Date(data);
      var formated = '';
      formated += date.getDate() < 10 ? '0' + date.getDate() + '/' : date.getDate() + '/';
      formated += (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '/' : (date.getMonth() + 1) + '/';
      formated += date.getFullYear();

      return formated;
    };

    this.abrirConfirmacaoExclusaoDe = function (oferta) {
      var self = this;
      var dialog = $mdDialog.confirm()
        .title('Excluir oferta?')
        .textContent('Essa ação não pode ser desfeita.')
        .ok('Excluir')
        .cancel('Cancelar');
      this.oferta = angular.copy(oferta);

      $mdDialog.show(dialog)
        .then(function() { self.confirmarExclusao(oferta.id) })
        .catch(function() { });
    };

    this.listarMeusProdutos = function () {
      var self = this;

      return UsuarioProdutoService
        .listarMeusProdutos()
        .then(function (ofertas) {
          self.ofertas = ofertas;
        });
    };

    this.confirmarExclusao = function (id) {
      var self = this;

      return UsuarioProdutoService
        .deletarOferta(id)
        .then(function () { self.listarMeusProdutos() });
    }
  };
})();
