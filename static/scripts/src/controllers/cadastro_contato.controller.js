(function () {
  angular
    .module('app')
    .controller('CadastroContatoController', CadastroContatoController);

  CadastroContatoController.$inject = [
    '$rootScope',
    '$location',
    '$cookies',
    '$mdDialog',
    'PersistenceService',
    'AutenticacaoService',
    'estados'
  ];

  function CadastroContatoController(
    $rootScope,
    $location,
    $cookies,
    $mdDialog,
    PersistenceService,
    AutenticacaoService,
    estados
  ) {
    var vm = this;
    // Models
    vm.estados = estados;
    vm.usuario = JSON.parse(PersistenceService.getSessionItem('usuario')) 
                    || $location.url('/registro/perfil');
    vm.endereco = JSON.parse(PersistenceService.getSessionItem('endereco')) || {
      cep: '',
      logradouro: '',
      numero: null,
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    };
    vm.telefone = JSON.parse(PersistenceService.getSessionItem('telefone')) || {
      Tipo: null,
      ddd: null,
      numero: null
    };
    vm.loading = false;

    vm.cepPattern = /\d{8}/;
    vm.dddPattern = /\d{2}/;
    vm.telPattern = /(\d{8}|\d{9})/;

    // Métodos
    vm.voltar = function () {
      if (vm.usuario.tipo === 'PF')
        return $location.url('/registro/pessoa-fisica');
      else
        return $location.url('/registro/pessoa-juridica');
    };

    vm.avancar = function () {
      PersistenceService.setSessionItem('endereco', JSON.stringify(vm.endereco));
      PersistenceService.setSessionItem('telefone', JSON.stringify(vm.telefone));

      return $mdDialog.show({
        contentElement: document.getElementById('terms_of_use_dialog'),
        parent: document.getElementsByTagName('body')[0]
      });
    };

    vm.cadastrar = function () {
      var Credencial = JSON.parse(PersistenceService.getSessionItem('credencial'));
      var PessoaFisica = JSON.parse(PersistenceService.getSessionItem('pessoa_fisica'));
      var PessoaJuridica = JSON.parse(PersistenceService.getSessionItem('pessoa_juridica'));
      var Email = JSON.parse(PersistenceService.getSessionItem('email'));
      var Endereco = vm.endereco;
      var Telefone = vm.telefone;
      var payload = vm.usuario;
      
      $mdDialog.hide();
      vm.loading = true;

      payload.Emails    = [ Email ];
      payload.Enderecos = [ Endereco ];
      payload.Telefones = [ Telefone ];
      
      if (vm.usuario.tipo === 'PF') {
        PessoaFisica.data_nascimento = new Date(PessoaFisica.data_nascimento)
          .toISOString()
          .split('T')[0];

        payload.PessoaFisica = PessoaFisica;
      }
      else {
        PessoaJuridica.data_fundacao = new Date(PessoaJuridica.data_fundacao)
          .toISOString()
          .split('T')[0];

        payload.PessoaJuridica = PessoaJuridica;
      }

      return AutenticacaoService
        .cadastrar(payload)
        .then(function (user) {
          return AutenticacaoService.autenticar(Email.email, payload.senha)
        })
        .then(function (token) {
          $cookies.put('session', token.token);
          $location.url('/meus-produtos');
          return $rootScope.$broadcast('login');
        });
    };

    vm.cancelar = function () {
      return $mdDialog.hide();
    };
  }
})();