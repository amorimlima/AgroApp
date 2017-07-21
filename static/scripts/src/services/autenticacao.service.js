class AutenticacaoService {
  constructor($http) {
    this.request = $http;
  }

  authenticate(email, senha) {
    return this.request
      .post('/email/autenticacao', { email, senha })
      .then(response => response.data);
  }
}

AutenticacaoService.$inject = ['$http'];

module.exports = AutenticacaoService
