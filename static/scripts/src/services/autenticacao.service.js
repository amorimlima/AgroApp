'use strict'

import angular from 'angular'

class AutenticacaoService {
  constructor($http, $cookies) {
    this.request = $http
    this.cookies = $cookies
  }

  cadastrar(payload) {
    return this.request
      .post('/autenticacao/cadastrar', payload)
      .then(response => response.data)
  }

  autenticar(email, senha) {
    return this.request
      .post('/autenticacao', { email, senha })
      .then(response => ({ token: response.data.token, status: response.status }))
  }
}

AutenticacaoService.$inject = ['$http', '$cookies']

angular
  .module('app')
  .service('AutenticacaoService', AutenticacaoService)
