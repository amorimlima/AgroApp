(function() {
  angular
    .module('app')
    .controller('CadastroPessoaFisicaController', CadastroPessoaFisicaController);

  CadastroPessoaFisicaController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService',
    'PessoaFisicaService'
  ];

  function CadastroPessoaFisicaController(
    $rootScope,
    $location,
    PersistenceService,
    PessoaFisicaService
  ) {
    var vm = this;

    vm.usuario = JSON.parse(PersistenceService.getSessionItem('usuario')) 
                    || $location.url('/registro/perfil');

    vm.pessoa_fisica = JSON.parse(PersistenceService.getSessionItem('pessoa_fisica')) || {
      cpf: '',
      rg: '',
      nome: '',
      sobrenome: '',
      data_nascimento: new Date('1988-00-01')
    };

    vm.data_nascimento = new Date(vm.pessoa_fisica.data_nascimento);

    vm.cpfPattern = /\d{11}/;

    vm.voltar = function () {
      return $location.url('/registro/credencial');
    };

    vm.avancar = function () {
      vm.pessoa_fisica.data_nascimento = vm.data_nascimento.toISOString();
      PersistenceService.removeSessionItem('pessoa_juridica');
      PersistenceService.setSessionItem('pessoa_fisica', JSON.stringify(vm.pessoa_fisica));
      return $location.url('/registro/contato');
    };

    vm.verificarCpf = function (cpf) {
      return PessoaFisicaService
        .listarPorCpf(cpf.$modelValue)
        .then(function (response) {
          if (response) {
            cpf.$error.em_uso = true;
            cpf.$valid = false;
            cpf.$invalid = true;
          }
          else {
            cpf.$error.em_uso = false;
            cpf.$valid = true;
            cpf.$invalid = false;
          }
        });
    };
  }
})();