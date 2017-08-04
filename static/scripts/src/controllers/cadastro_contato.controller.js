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
    'AutenticacaoService'
  ];

  function CadastroContatoController(
    $rootScope,
    $location,
    $cookies,
    $mdDialog,
    PersistenceService,
    AutenticacaoService
  ) {
    // Models
    this.estados = [{nome:"Acre",sigla:"AC"},{nome:"Alagoas",sigla:"AL"},{nome:"Amapá",sigla:"AP"},{nome:"Amazonas",sigla:"AM"},{nome:"Bahia ",sigla:"BA"},{nome:"Ceará",sigla:"CE"},{nome:"Distrito Federal ",sigla:"DF"},{nome:"Espírito Santo",sigla:"ES"},{nome:"Goiás",sigla:"GO"},{nome:"Maranhão",sigla:"MA"},{nome:"Mato Grosso",sigla:"MT"},{nome:"Mato Grosso do Sul",sigla:"MS"},{nome:"Minas Gerais",sigla:"MG"},{nome:"Pará",sigla:"PA"},{nome:"Paraíba",sigla:"PB"},{nome:"Paraná",sigla:"PR"},{nome:"Pernambuco",sigla:"PE"},{nome:"Piauí",sigla:"PI"},{nome:"Rio de Janeiro",sigla:"RJ"},{nome:"Rio Grande do Norte",sigla:"RN"},{nome:"Rio Grande do Sul",sigla:"RS"},{nome:"Rondônia",sigla:"RO"},{nome:"Roraima",sigla:"RR"},{nome:"Santa Catarina",sigla:"SC"},{nome:"São Paulo",sigla:"SP"},{nome:"Sergipe",sigla:"SE"},{nome:"Tocantins",sigla:"TO"}];
    this.usuario = JSON.parse(PersistenceService.getSessionItem('usuario')) 
                    || this.$location.url('/registro/perfil');
    this.endereco = JSON.parse(PersistenceService.getSessionItem('endereco')) || {
      cep: '',
      logradouro: '',
      numero: null,
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    };
    this.telefone = JSON.parse(PersistenceService.getSessionItem('telefone')) || {
      Tipo: null,
      ddd: null,
      numero: null
    };

    this.cepPattern = /\d{8}/;
    this.dddPattern = /\d{2}/;
    this.telPattern = /(\d{8}|\d{9})/;

    // Métodos
    this.voltar = function () {
      if (this.usuario.tipo === 'PF')
        return $location.url('/registro/pessoa-fisica');
      else
        return $location.url('/registro/pessoa-juridica');
    };

    this.avancar = function () {
      PersistenceService.setSessionItem('endereco', JSON.stringify(this.endereco));
      PersistenceService.setSessionItem('telefone', JSON.stringify(this.telefone));

      return $mdDialog.show({
        contentElement: document.getElementById('terms_of_use_dialog'),
        parent: document.getElementsByTagName('body')[0]
      });
    };

    this.cadastrar = function () {
      var Credencial = JSON.parse(PersistenceService.getSessionItem('credencial'));
      var PessoaFisica = JSON.parse(PersistenceService.getSessionItem('pessoa_fisica'));
      var PessoaJuridica = JSON.parse(PersistenceService.getSessionItem('pessoa_juridica'));
      var Email = JSON.parse(PersistenceService.getSessionItem('email'));
      var Endereco = this.endereco;
      var Telefone = this.telefone;
      var payload = this.usuario;

      payload.Emails    = [ Email ];
      payload.Enderecos = [ Endereco ];
      payload.Telefones = [ Telefone ];
      
      if (this.usuario.tipo === 'PF') {
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
          return $location.url('/meus-produtos');
        });
    };

    this.cancelar = function () {
      return $mdDialog.hide();
    };
  }
})();
