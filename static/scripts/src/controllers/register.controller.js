class RegisterController {
  constructor($rootScope, UsuarioService) {
    this.$rootScope = $rootScope;
    this.usuarioService = UsuarioService;

    this.usuario = {};
    this.email = {};
    this.credencial = {};

    this.$rootScope.view.name = 'Cadastro';
  }

  registerStepOne() {
    return this.usuarioService
      .register(this.usuario, this.email, this.credencial)
      .then((usuario) => {
        this.usuario.id = usuario.id;
        this.usuario.tipo = usuario.tipo;
        this.email = Object.assign({}, usuario.email);
        this.credencial = Object.assign({}, usuario.credencial);
      });
  }
}

RegisterController.$inject = [
  '$rootScope',
  'UsuarioService'
];

module.exports = RegisterController;
