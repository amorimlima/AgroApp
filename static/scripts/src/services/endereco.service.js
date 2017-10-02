'use strict'

import angular from 'angular'

class EnderecoService {
  constructor($http) {
    this.request = $http
  }

  static get $inject() {
    return ['$http']
  }

  listarEstados() {
    return this.request
      .get('/endereco/estado')
      .then(response => response.data)
  }

  listarEnderecoPorCep(cep) {
    return this.request
      .get(`http://api.postmon.com.br/v1/cep/${cep}`)
      .then(response => response.data)
  }

  listarCidadesDe(estado) {
    return this.request
      .get(`/endereco/${estado}/cidades`)
      .then(response => response.data)
  }
}

angular
  .module('app')
  .service('EnderecoService', EnderecoService)
