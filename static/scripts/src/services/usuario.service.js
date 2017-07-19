class UsuarioService {
  constructor($http) {
    this.request = $http;
  }

  registerCredentials(usuario, email, credencial) {
    const payload = { usuario, email, credencial };

    return this.request
      .post('/usuario/registro/credencial', payload)
      .then(response => response.data);
  }

  registerPersonalData(usuario, telefone, pessoa_fisica, pessoa_juridica) {
    const payload = { usuario, telefone, pessoa_fisica, pessoa_juridica };

    return this.request
      .post('/usuario/registro/dados-pessoais', payload)
      .then(response => response.data);
  }
}

UsuarioService.$inject = ['$http'];

module.exports = UsuarioService;
