(function () {
  angular
    .module('app')
    .controller('BuscaController', BuscaController);

  BuscaController.$inject = [
    'UsuarioProdutoService',
    'categorias',
    'estados'
  ];

  function BuscaController(UsuarioProdutoService, categorias, estados) {
    var vm = this;

    // Models
    vm.viewState  = 'filtros';
    vm.categorias = categorias || [];
    vm.estados    = estados || [];
    vm.filtros    = { Categoria: 1, estado: '', cidade: '' };
    vm.listaResultados = [];
    vm.isBuscandoDados = false;

    // Métodos
    vm.setViewState = function (state) {
      vm.viewState = state;
    };

    vm.carregarOfertas = function (filtros) {
      vm.isBuscandoDados = true;
      vm.listaResultados = [];
      vm.viewState = 'resultados';

      UsuarioProdutoService
        .buscarOfertas(filtros.Produto, filtros.estado, filtros.cidade)
        .then(function (ofertas) {
          vm.isBuscandoDados = false;
          return vm.listaResultados = angular.copy(ofertas);
        })
    };

    vm.getFormatedDate = function (data) {
      var date = new Date(data);
      var formated = '';
      formated += date.getDate() < 10 ? '0' + date.getDate() + '/' : date.getDate() + '/';
      formated += (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) + '/' : (date.getMonth() + 1) + '/';
      formated += date.getFullYear();

      return formated;
    };

    vm.getNomeDaPessoa = function (Pessoa) {
      if (Pessoa.tipo === 'PF')
        return Pessoa.PessoaFisica.nome + ' ' + Pessoa.PessoaFisica.sobrenome;
      else
        return Pessoa.PessoaJuridica.razao_social;
    };
  }
})();
