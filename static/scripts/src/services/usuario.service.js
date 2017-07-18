class UsuarioService {
  constructor($http) {
    this.request = $http;
  }

  register(usuario, email, credencial) {
    const payload = { usuario, email, credencial };

    return this.request
      .post('/usuario/register', payload)
      .then(response => response.data);
  }
}

UsuarioService.$inject = ['$http'];

module.exports = UsuarioService;
