class RegisterController {
  constructor(UsuarioService) {
    this.usuarioService = UsuarioService;

    this.usuario = {};
    this.email = {};
    this.credencial = {};
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

RegisterController.$inject = ['UsuarioService'];

module.exports = RegisterController;
