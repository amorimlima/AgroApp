class UsuarioService {
  constructor($http) {
    this.request = $http;
  }

  register(usuario, email, credencial, pessoa_fisica, pessoa_juridica, endereco, telefone) {
    const payload = { usuario, email, credencial, pessoa_fisica, pessoa_juridica, endereco, telefone };

    return this.request
      .post('/usuario/novo', payload)
      .then(response => response.data);
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
