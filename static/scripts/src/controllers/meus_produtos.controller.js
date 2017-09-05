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
    var self = this;
    
    // Models
    self.oferta = {};
    self.ofertas = ofertas;
    self.produtosDisponiveis = produtos;
    self.categoria = null;
    self.textoBusca = '';
    self.mensagemStatus = 'Nenhum produto encontrado.';

    // Métodos
    self.abrirFormulario = function (oferta) {
      if (!oferta) {
        self.oferta = {};
        self.categoria = null;
      }
      else {
        self.oferta = angular.copy(oferta);
        self.categoria = oferta.Anuncio.Categoria;
        self.oferta.data_inicio = new Date(self.oferta.data_inicio);
        self.oferta.data_fim = new Date(self.oferta.data_fim);
      }

      $mdDialog.show({
        clickOutsideToClose: true,
        contentElement: document.getElementById('produto_form'),
        parent: document.getElementsByTagName('body')[0]
      });
    };

    self.produtosFiltrados = function (categoria) {
      if (!categoria) {
        return [ { id: null, nome: 'Selecione uma categoria' } ];
      }

      return self.produtosDisponiveis
        .filter(function (produto) { return produto.Categoria === categoria });
    }

    self.cancelar = function () {
      self.produto = {};
      return $mdDialog.hide();
    };

    self.salvar = function () {
      self.ofertas = [];

      return UsuarioProdutoService
        .cadastrarOferta(self.oferta)
        .then(function (oferta) {
          $mdDialog.hide();
          self.listarMeusProdutos();
        });
    };

    self.produtosPorCategoria = function (categoria) {
      return self.produtosDisponiveis
        .filter(function (produto) {
          return produto.Categoria === categoria;
        });
    };

    self.getFormatedDate = function (data) {
      var date = new Date(data);
      var formated = '';
      formated += date.getDate() < 10 ? '0' + date.getDate() + '/' : date.getDate() + '/';
      formated += (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '/' : (date.getMonth() + 1) + '/';
      formated += date.getFullYear();

      return formated;
    };

    self.abrirConfirmacaoExclusaoDe = function (oferta) {
      var dialog = $mdDialog.confirm()
        .title('Excluir oferta?')
        .textContent('Essa ação não pode ser desfeita.')
        .ok('Excluir')
        .cancel('Cancelar');
      self.oferta = angular.copy(oferta);

      $mdDialog.show(dialog)
        .then(function() { self.confirmarExclusao(oferta.id) })
        .catch(function() { });
    };

    self.listarMeusProdutos = function () {

      return UsuarioProdutoService
        .listarMeusProdutos()
        .then(function (ofertas) {
          self.ofertas = ofertas;
        });
    };

    self.confirmarExclusao = function (id) {

      return UsuarioProdutoService
        .deletarOferta(id)
        .then(function () { self.listarMeusProdutos() });
    }
  };
})();
