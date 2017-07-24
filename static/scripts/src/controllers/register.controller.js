class RegisterController {
  constructor($rootScope, $location, UsuarioService, AutenticacaoService,
    perfis, estados) {

    this.$rootScope = $rootScope;
    this.$location = $location;
    this.usuarioService = UsuarioService;
    this.autenticacaoService = AutenticacaoService;

    this.perfis = perfis;
    this.estados = [{nome: "Acre",sigla: "AC"},{nome: "Alagoas",sigla: "AL"},{nome: "Amapá",sigla: "AP"},{nome: "Amazonas",sigla: "AM"},{nome: "Bahia ",sigla: "BA"},{nome: "Ceará",sigla: "CE"},{nome: "Distrito Federal ",sigla: "DF"},{nome: "Espírito Santo",sigla: "ES"},{nome: "Goiás",sigla: "GO"},{nome: "Maranhão",sigla: "MA"},{nome: "Mato Grosso",sigla: "MT"},{nome: "Mato Grosso do Sul",sigla: "MS"},{nome: "Minas Gerais",sigla: "MG"},{nome: "Pará",sigla: "PA"},{nome: "Paraíba",sigla: "PB"},{nome: "Paraná",sigla: "PR"},{nome: "Pernambuco",sigla: "PE"},{nome: "Piauí",sigla: "PI"},{nome: "Rio de Janeiro",sigla: "RJ"},{nome: "Rio Grande do Norte",sigla: "RN"},{nome: "Rio Grande do Sul",sigla: "RS"},{nome: "Rondônia",sigla: "RO"},{nome: "Roraima",sigla: "RR"},{nome: "Santa Catarina",sigla: "SC"},{nome: "São Paulo",sigla: "SP"},{nome: "Sergipe",sigla: "SE"},{nome: "Tocantins",sigla: "TO"}];
    this.cidades = [];
    this.step = 1; // 1: credenciais, 2: dados pessoais, 3: termos de uso
    this.usuario = {};
    this.email = {};
    this.credencial = {};
    this.pessoa_fisica = {};
    this.pessoa_juridica = {};

    this.credentialStep = 1;
    this.onContact = false;
    this.$rootScope.view.name = 'Cadastro';
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

  loadCities() {
    if (this.cidades.length === 0) {
      return this.cidadeEstadoService
        .getCitiesFrom(this.endereco.estado)
        .then((cidades) => {
          this.cidades = cidades;
        })
    }

    return null;
  }

  registerStepOne() {
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
      });
  }
    
  registerStepThree() {
    return this.autenticacaoService
      .authenticate(this.email.email, this.credencial.senha)
      .then(() =>  this.$location.url('/meus-produtos'));
  }
}

RegisterController.$inject = [
  '$rootScope',
  '$location',
  'UsuarioService',
  'AutenticacaoService'
];

module.exports = RegisterController;
