'use strict'

import angular from 'angular'

class FavoritoService {
  constructor($http) {
    this.request = $http
  }

  static get $inject() {
    return ['$http']
  }

  checarFavorito(usuario) {
    return this.request
      .get(`/favorito/${usuario}`)
      .then(response => !!response.data);
  }

  favoritar(usuario) {
    return this.request
      .post('/favorito', { favorito: usuario })
      .then(response => response.data);
  };

  desfavoritar(usuario) {
    return this.request
      .delete('/favorito/' + usuario)
      .then(response => response.data);
  };

  listarMeusFavoritos() {
    return this.request
      .get('/favorito/meus')
      .then(response => response.data);
  }
}

angular
  .module('app')
  .service('FavoritoService', FavoritoService)

