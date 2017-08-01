(function () {
  angular
    .module('app')
    .controller('ContatoController', ContatoController);

  ContatoController.$inject = [
    '$rootScope',
    '$location',
    '$mdDialog',
    'PersistenceService',
    'UsuarioService',
    'AutenticacaoService'
  ];

  function ContatoController(
    $rootScope,
    $location,
    $mdDialog,
    PersistenceService,
    UsuarioService,
    AutenticacaoService
  ) {
    this.estados = [{nome:"Acre",sigla:"AC" },{nome:"Alagoas",sigla:"AL" },{nome:"Amapá",sigla:"AP" },{nome:"Amazonas",sigla:"AM" },{nome:"Bahia ",sigla:"BA" },{nome:"Ceará",sigla:"CE" },{nome:"Distrito Federal ",sigla:"DF" },{nome:"Espírito Santo",sigla:"ES" },{nome:"Goiás",sigla:"GO" },{nome:"Maranhão",sigla:"MA" },{nome:"Mato Grosso",sigla:"MT" },{nome:"Mato Grosso do Sul",sigla:"MS" },{nome:"Minas Gerais",sigla:"MG" },{nome:"Pará",sigla:"PA" },{nome:"Paraíba",sigla:"PB" },{nome:"Paraná",sigla:"PR" },{nome:"Pernambuco",sigla:"PE" },{nome:"Piauí",sigla:"PI" },{nome:"Rio de Janeiro",sigla:"RJ" },{nome:"Rio Grande do Norte",sigla:"RN" },{nome:"Rio Grande do Sul",sigla:"RS" },{nome:"Rondônia",sigla:"RO" },{nome:"Roraima",sigla:"RR" },{nome:"Santa Catarina",sigla:"SC" },{nome:"São Paulo",sigla:"SP" },{nome:"Sergipe",sigla:"SE" },{nome:"Tocantins",sigla:"TO" }];
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
      tipo: null,
      ddd: null,
      numero: null
    };

    this.cepPattern = /\d{8}/;
    this.dddPattern = /\d{2}/;
    this.telPattern = /(\d{8}|\d{9})/;

    this.goBack = function () {
      if (this.tipo === 'PF')
        return this.$location.url('/registro/dados-pessoais');
      else
        return this.$location.url('/registro/dados-empresariais');
    };

    this.goToTermsOfUse = function () {
      PersistenceService.setSessionItem('endereco', JSON.stringify(this.endereco));
      PersistenceService.setSessionItem('telefone', JSON.stringify(this.telefone));

      return this.$mdDialog.show({
        contentElement: document.getElementById('terms_of_use_dialog'),
        parent: document.getElementsByTagName('body')[0]
      });
    };

    this.cancelRegister = function () {
      this.storage.clearSessionItems();
      return this.$location.url('/entrar');
    };

    this.completeRegister = function () {
      //usuario, email, credencial, pf, pj, endereco, telefone
      var nascimento = new Date(this.storage.getSessionItem('data_nascimento'));
      var fundacao = new Date(this.storage.getSessionItem('data_fundacao'));
      var usuario = { tipo: this.storage.getSessionItem('tipo') };
      var email = { email: this.storage.getSessionItem('email') };
      var credencial = {
        perfil: parseInt(this.storage.getSessionItem('perfil')),
        senha: this.storage.getSessionItem('senha')
      };
      var endereco = {
        cep: this.storage.getSessionItem('cep'),
        logradouro: this.storage.getSessionItem('logradouro'),
        numero: parseInt(this.storage.getSessionItem('numero')),
        complemento: this.storage.getSessionItem('complemento') || null,
        bairro: this.storage.getSessionItem('bairro'),
        cidade: this.storage.getSessionItem('cidade'),
        estado: this.storage.getSessionItem('estado')
      };
      var telefone = {
        tipo: parseInt(this.storage.getSessionItem('tipo_telefone')),
        ddd: parseInt(this.storage.getSessionItem('ddd')),
        numero: parseInt(this.storage.getSessionItem('numero_telefone'))
      };
      var pf = {
        cpf: this.storage.getSessionItem('cpf'),
        rg: this.storage.getSessionItem('rg'),
        nome: this.storage.getSessionItem('nome'),
        sobrenome: this.storage.getSessionItem('sobrenome'),
        data_nascimento: `${nascimento.getFullYear()}-${nascimento.getMonth() + 1}-${nascimento.getDate()}`
      };
      var pj = {
        cnpj: this.storage.getSessionItem('cnpj'),
        razao_social: this.storage.getSessionItem('razao_social'),
        responsavel: this.storage.getSessionItem('responsavel'),
        data_funcadao: `${fundacao.getFullYear()}-${fundacao.getMonth() + 1}-${fundacao.getDate()}`
      };

      if (usuario.tipo === 'PF')
        pj = null;
      else
        pf = null;

      return this.usuarioService
        .register(usuario, email, credencial, pf, pj, endereco, telefone)
        .then(function (user) { this.auth.authenticate(email.email, credencial.senha) })
        .then(function (token) {
          this.storage.setPreference('token', token);
          this.goToMyProducts();
        });
    };

    this.goToMyProducts = function () {
      this.$location.url('/meus-produtos');
    };
  }
})();
