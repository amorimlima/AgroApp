'use strict'

import angular from 'angular'

class UsuarioService {
  constructor($http) {
    this.request = $http
  }

  static get $inject() {
    return ['$http']
  }

  getDadosDe(Usuario) {
    return this.request
      .get(`/usuario/${Usuario}`)
      .then(response => response.data)
  }

  buscarDadosDoLogado(token) {
    return this.request
      .get(`/usuario/logado?token=${token}`)
      .then(response => response.data)
  }

  buscarPessoaDoLogado() {
    return this.request
      .get('/usuario/logado/pessoa')
      .then(response => response.data)
  }
}

angular
  .module('app')
  .service('UsuarioService', UsuarioService)
