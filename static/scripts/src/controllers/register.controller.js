class RegisterController {
  constructor(
    $rootScope,
    $location,
    UsuarioService,
    AutenticacaoService,
    $mdDialog,
    perfis,
    estados
  ) {

    //this.$rootScope.view.name = 'Cadastro';

    // Providers
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$dialog = $mdDialog;
    this.usuarioService = UsuarioService;
    this.autenticacaoService = AutenticacaoService;

    // Resolves
    this.perfis = perfis;
    this.estados = [{nome:"Acre",sigla:"AC"},{nome:"Alagoas",sigla:"AL"},{nome:"Amapá",sigla:"AP"},{nome:"Amazonas",sigla:"AM"},{nome:"Bahia ",sigla:"BA"},{nome:"Ceará",sigla:"CE"},{nome:"Distrito Federal ",sigla:"DF"},{nome:"Espírito Santo",sigla:"ES"},{nome:"Goiás",sigla:"GO"},{nome:"Maranhão",sigla:"MA"},{nome:"Mato Grosso",sigla:"MT"},{nome:"Mato Grosso do Sul",sigla:"MS"},{nome:"Minas Gerais",sigla:"MG"},{nome:"Pará",sigla:"PA"},{nome:"Paraíba",sigla:"PB"},{nome:"Paraná",sigla:"PR"},{nome:"Pernambuco",sigla:"PE"},{nome:"Piauí",sigla:"PI"},{nome:"Rio de Janeiro",sigla:"RJ"},{nome:"Rio Grande do Norte",sigla:"RN"},{nome:"Rio Grande do Sul",sigla:"RS"},{nome:"Rondônia",sigla:"RO"},{nome:"Roraima",sigla:"RR"},{nome:"Santa Catarina",sigla:"SC"},{nome:"São Paulo",sigla:"SP"},{nome:"Sergipe",sigla:"SE"},{nome:"Tocantins",sigla:"TO"}];

    // Models
    this.usuario = {};
    this.email   = {};
    this.credencial    = {};
    this.pessoa_fisica = { data_nascimento: new Date() };
    this.pessoa_juridica = { data_fundacao: new Date() };

    // Senha
    this.senha = '';

    // Validation patterns
    this.cnpjPattern = /\d{14}/;
    this.cpfPattern = /\d{11}/;
    this.rgPattern = /\d{9}/;
    this.cepPattern = /\d{8}/;
    this.dddPattern = /\d{2}/;
    this.telPattern = /(\d{8}|\d{9})/;

    // States
    this.step = 1; // 1: credenciais, 2: dados pessoais, 3: termos de uso
    this.credentialStep = 1;
    this.onContact = false;
  }

  get perfil() {
    return this.credencial.perfil;
  }

  set perfil(perfil) {
    this.credencial.perfil = perfil;
  }

  get tipoPessoa() {
    return this.usuario.tipo;
  }

  set tipoPessoa(tipo) {
    this.usuario.tipo = tipo;
  }

  get isOnContact() {
    return this.onContact;
  }

  showCredentialsInputs() {
    this.credentialStep = 2;
  }

  showContactForm() {
    this.onContact = true;
  }

  registerStepOne() {
    this.login = this.email.email + '';
    this.senha = this.credencial.senha + '';

    return this.usuarioService
      .registerCredentials(this.usuario, this.email, this.credencial)
      .then((usuario) => {
        this.usuario.id = usuario.id;
        this.usuario.tipo = usuario.tipo;
        this.email = Object.assign({}, usuario.email);
        this.credencial = Object.assign({}, usuario.credencial);
        this.step = 2;
      });
  }

  registerStepTwo() {
    return this.usuarioService
      .registerPersonalData(this.usuario, this.telefone, this.pessoa_fisica, this.pessoa_juridica)
      .then((response) => {
        this.telefone = Object.assign({}, response.telefone);
        this.pessoa_fisica = Object.assign({}, response.pessoa_fisica);
        this.pessoa_juridica = Object.assign({}, response.pessoa_juridica);
        this.step = 3;
        this.$dialog.show({
          contentElement: document.getElementById('terms_of_use_dialog'),
          parentElement: document.getElementsByTagName('body')[0]
        });
      });
  }
    
  registerStepThree() {
    return this.autenticacaoService
      .authenticate(this.email.email, this.credencial.senha)
      .then(() => this.$location.url('/my-products'));
  }

  cancelRegister() {
    this.closeDialog();
    return this.$location.url('/login');
  }

  finishRegister() {
    this.closeDialog();
    return this.autenticacaoService
      .authenticate(this.login, this.senha)
      .then(token => this.autenticacaoService.saveToken(token))
      .then(() => this.$location.url('/my-products'))
      .catch(() => this.$location.url('/login'));
  }

  closeDialog() {
    return this.$dialog.hide();
  }
}

RegisterController.$inject = [
  '$rootScope',
  '$location',
  'UsuarioService',
  'AutenticacaoService',
  '$mdDialog',
  '$mdToast'
];

module.exports = RegisterController;
