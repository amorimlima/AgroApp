(function() {
  angular
    .module('app')
    .controller('CadastroPessoaJuridicaController', CadastroPessoaJuridicaController)

  CadastroPessoaJuridicaController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService',
    'PessoaJuridicaService'
  ];

  function CadastroPessoaJuridicaController(
    $rootScope,
    $location,
    PersistenceService,
    PessoaJuridicaService
  ) {
    var vm = this;
    // Models
    vm.usuario = JSON.parse(PersistenceService.getSessionItem('usuario'))
                    || $location.url('/registro/perfil');

    vm.pessoa_juridica = JSON.parse(PersistenceService.getSessionItem('pessoa_juridica')) || {
      cnpj: '',
      razao_social: '',
      responsavel: '',
      data_fundacao: new Date('1991-00-01')
    };
    vm.data_fundacao = new Date(vm.pessoa_juridica.data_fundacao);
    vm.cnpjPattern = /\d{14}/;

    // Métodos
    vm.voltar = function () {
      return $location.url('/registro/credencial');
    };

    vm.avancar = function () {
      vm.pessoa_juridica.data_fundacao = vm.data_fundacao.toISOString();
      PersistenceService.removeSessionItem('pessoa_fisica');
      PersistenceService.setSessionItem('pessoa_juridica', JSON.stringify(vm.pessoa_juridica));
      return $location.url('/registro/contato')
    };

    vm.verificarCnpj = function (cnpj) {
      return PessoaJuridicaService
        .listarPorCnpj(cnpj.$modelValue)
        .then(function (response) {
          if (response) {
            cnpj.$error.em_uso = true;
            cnpj.$valid = false;
            cnpj.$invalid = true;
          }
          else {
            cnpj.$error.em_uso = false;
            cnpj.$valid = true;
            cnpj.$invalid = false;
          }
        });
    }
  }
})();
