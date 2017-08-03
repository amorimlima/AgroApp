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
    this.showDialog = function () {
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

      return UsuarioProdutoService
        .cadastrarOferta(this.oferta)
        .then(function (oferta) {
          self.oferta.id = oferta.id;
          self.ofertas.unshift(oferta);
          $mdDialog.hide();
        });
    };

    this.produtosPorCategoria = function (categoria) {
      return this.produtosDisponiveis
        .filter(function (produto) {
          return produto.Categoria === categoria;
        });
    };

    this.getFormatedDate = function (data) {
      return data
        .split('-')
        .reverse()
        .join('/');
    }
  };
})();
