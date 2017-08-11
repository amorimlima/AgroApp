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
    var vm = this;
    
    // Models
    vm.oferta = {};
    vm.ofertas = ofertas;
    vm.produtosDisponiveis = produtos;
    vm.categoria = null;
    vm.textoBusca = '';
    vm.mensagemStatus = 'Nenhum produto encontrado.';

    // Métodos
    vm.abrirFormulario = function (oferta) {
      if (!oferta) {
        vm.oferta = {};
        vm.categoria = null;
      }
      else {
        vm.oferta = angular.copy(oferta);
        vm.categoria = oferta.Anuncio.Categoria;
        vm.oferta.data_inicio = new Date(vm.oferta.data_inicio);
        vm.oferta.data_fim = new Date(vm.oferta.data_fim);
      }

      $mdDialog.show({
        clickOutsideToClose: true,
        contentElement: document.getElementById('produto_form'),
        parent: document.getElementsByTagName('body')[0]
      });
    };

    vm.produtosFiltrados = function (categoria) {
      if (!categoria) {
        return [ { id: null, nome: 'Selecione uma categoria' } ];
      }

      return vm.produtosDisponiveis
        .filter(function (produto) { return produto.Categoria === categoria });
    }

    vm.cancelar = function () {
      vm.produto = {};
      return $mdDialog.hide();
    };

    vm.salvar = function () {
      var self = vm;
      vm.ofertas = [];

      return UsuarioProdutoService
        .cadastrarOferta(vm.oferta)
        .then(function (oferta) {
          $mdDialog.hide();
          self.listarMeusProdutos();
        });
    };

    vm.produtosPorCategoria = function (categoria) {
      return vm.produtosDisponiveis
        .filter(function (produto) {
          return produto.Categoria === categoria;
        });
    };

    vm.getFormatedDate = function (data) {
      var date = new Date(data);
      var formated = '';
      formated += date.getDate() < 10 ? '0' + date.getDate() + '/' : date.getDate() + '/';
      formated += (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '/' : (date.getMonth() + 1) + '/';
      formated += date.getFullYear();

      return formated;
    };

    vm.abrirConfirmacaoExclusaoDe = function (oferta) {
      var self = vm;
      var dialog = $mdDialog.confirm()
        .title('Excluir oferta?')
        .textContent('Essa ação não pode ser desfeita.')
        .ok('Excluir')
        .cancel('Cancelar');
      vm.oferta = angular.copy(oferta);

      $mdDialog.show(dialog)
        .then(function() { self.confirmarExclusao(oferta.id) })
        .catch(function() { });
    };

    vm.listarMeusProdutos = function () {
      var self = vm;

      return UsuarioProdutoService
        .listarMeusProdutos()
        .then(function (ofertas) {
          self.ofertas = ofertas;
        });
    };

    vm.confirmarExclusao = function (id) {
      var self = vm;

      return UsuarioProdutoService
        .deletarOferta(id)
        .then(function () { self.listarMeusProdutos() });
    }
  };
})();
