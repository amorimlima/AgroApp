(function() {
  angular
    .module('app')
    .controller('CadastroPessoaFisicaController', CadastroPessoaFisicaController);

  CadastroPessoaFisicaController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService'
  ];

  function CadastroPessoaFisicaController($rootScope, $location, PersistenceService) {

    this.usuario = JSON.parse(PersistenceService.getSessionItem('usuario')) 
                    || $location.url('/registro/perfil');

    this.pessoa_fisica = JSON.parse(PersistenceService.getSessionItem('pessoa_fisica')) || {
      cpf: '',
      rg: '',
      nome: '',
      sobrenome: '',
      data_nascimento: new Date('1988-00-01')
    };

    this.data_nascimento = new Date(this.pessoa_fisica.data_nascimento);

    this.cpfPattern = /\d{11}/;

    this.voltar = function () {
      return $location.url('/registro/credencial');
    };

    this.avancar = function () {
      this.pessoa_fisica.data_nascimento = this.data_nascimento.toISOString();
      PersistenceService.removeSessionItem('pessoa_juridica');
      PersistenceService.setSessionItem('pessoa_fisica', JSON.stringify(this.pessoa_fisica));
      return $location.url('/registro/contato');
    };
  }
})();