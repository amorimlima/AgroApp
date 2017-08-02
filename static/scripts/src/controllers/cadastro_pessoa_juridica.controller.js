(function() {
  angular
    .module('app')
    .controller('CadastroPessoaJuridicaController', CadastroPessoaJuridicaController)

  CadastroPessoaJuridicaController.$inject = [
    '$rootScope',
    '$location',
    'PersistenceService'
  ];

  function CadastroPessoaJuridicaController($rootScope, $location, PersistenceService) {
    // Models
    this.usuario = JSON.parse(PersistenceService.getSessionItem('usuario'))
                    || $location.url('/registro/perfil');

    this.pessoa_juridica = JSON.parse(PersistenceService.getSessionItem('pessoa_juridica')) || {
      cnpj: '',
      razao_social: '',
      responsavel: '',
      data_fundacao: new Date('1991-00-01')
    };
    this.data_fundacao = new Date(this.pessoa_juridica.data_fundacao);
    this.cnpjPattern = /\d{14}/;

    // Métodos
    this.voltar = function () {
      return $location.url('/registro/credencial');
    };

    this.avancar = function () {
      this.pessoa_juridica.data_fundacao = this.data_fundacao.toISOString();
      PersistenceService.removeSessionItem('pessoa_fisica');
      PersistenceService.setSessionItem('pessoa_juridica', JSON.stringify(this.pessoa_juridica));
      return $location.url('/registro/contato')
    };
  }
})();
