class RegisterController {
  constructor($rootScope, UsuarioService, perfis) {
    this.$rootScope = $rootScope;
    this.usuarioService = UsuarioService;

    this.perfis = perfis;
    this.step = 1; // 1: credenciais, 2: dados pessoais, 3: termos de uso
    this.usuario = {};
    this.email = {};
    this.credencial = {};
    this.pessoa_fisica = {};
    this.pessoa_juridica = {};

    this.$rootScope.view.name = 'Cadastro';
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
}

RegisterController.$inject = [
  '$rootScope',
  'UsuarioService'
];

module.exports = RegisterController;
