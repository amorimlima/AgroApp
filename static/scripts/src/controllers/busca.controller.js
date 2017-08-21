(function () {
  angular
    .module('app')
    .controller('BuscaController', BuscaController);

  BuscaController.$inject = [
    '$location',
    'UsuarioProdutoService',
    'categorias',
    'estados'
  ];

  function BuscaController(
    $location,
    UsuarioProdutoService,
    categorias,
    estados
  ) {

    var vm = this;

    // Models
    vm.viewState  = 'filtros';
    vm.categorias = categorias || [];
    vm.estados    = estados    || [];
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
          vm.listaResultados = angular.copy(ofertas);
        });
    };

    vm.abrirOferta = function (oferta) {
      return $location.url('/oferta/' + oferta);
    };

    vm.getNomeDaPessoa = function (Pessoa) {
      if (Pessoa.tipo === 'PF')
        return Pessoa.PessoaFisica.nome + ' ' + Pessoa.PessoaFisica.sobrenome;
      else
        return Pessoa.PessoaJuridica.razao_social;
    };
  }
})();
