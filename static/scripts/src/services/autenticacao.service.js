class AutenticacaoService {
  constructor($http, $cookies) {
    this.request = $http;
    this.cookies = $cookies;
  }

  authenticate(email, senha) {
    return this.request
      .post('/email/autenticacao', { email, senha })
      .then(response => response.data);
  }

  saveToken(token) {
    return Promise.resolve($cookies.set('sesstoken', token));
  }
}

AutenticacaoService.$inject = [
  '$http',
  '$cookies'
];

module.exports = AutenticacaoService
