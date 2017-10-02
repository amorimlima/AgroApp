'use strict'

import angular from 'angular'

class CategoriaProdutoService {
  constructor($http) {
    this.request = $http
  }

  getAll() {
    return this.request
      .get('/categoria')
      .then(response => response.data)
  }

  getComProdutos() {
    return this.request
      .get('/categoria/produtos')
      .then(response => response.data)
  }
}

CategoriaProdutoService.$inject = ['$http']

angular
  .module('app')
  .service('CategoriaProdutoService', CategoriaProdutoService)
