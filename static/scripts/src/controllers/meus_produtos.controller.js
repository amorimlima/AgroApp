(function() {
  angular
    .module('app')
    .controller('MeusProdutosController', MeusProdutosController);

  MeusProdutosController.$inject = [
    '$rootScope',
    '$mdDialog',
    'CategoriaProdutoService'
  ];

  function MeusProdutosController($rootScope, $mdDialog, CategoriaProdutoService) {
    // Models
    this.produto = {};
    this.produtos = [];
    this.mensagemStatus = 'Nenhum produto encontrado.';

    // Métodos
    this.showDialog = function (id) {
      if (!id) {
        this.produto = {};
      }
    }


    $mdDialog.show({
      contentElement: document.getElementById('produto_form'),
      parent: document.getElementsByTagName('body')[0]
    });
  };
})();
