'use strict'

import angular from 'angular'

class EmailService {
  constructor($http){
    this.request = $http
  }

  listarPorEndereco(endereco) {
    return this.request
      .get(`/email/${endereco}`)
      .then(response => response.data)
  }
}

EmailService.$inject = ['$http']

angular
  .module('app')
  .service('EmailService', EmailService)
