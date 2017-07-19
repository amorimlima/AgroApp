class PerfilService {
  constructor($http) {
    this.request = $http;
  }
  
  getAvailable() {
    return this.request
      .get('/perfil/disponivel')
      .then(response => response.data);
  }
}

module.exports = PerfilService;
