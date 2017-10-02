'use strict'

import angular from 'angular'

class CadastroPerfilController {
  constructor($rootScope, $location, PersistenceService) {
    this.root = $rootScope
    this.location = $location
    this.persistence = PersistenceService

    this.usuario = JSON.parse(this.persistence.getSessionItem('usuario')) || { tipo: '', senha: '', Perfil: null }
  }

  static get $inject() {
    return ['$rootScope', '$location', 'PersistenceService']
  }

  voltar() {
    this.persistence.clearSessionItems()
    return this.location.url('/')
  }

  avancar() {
    this.persistence.setSessionItem('usuario', JSON.stringify(this.usuario))
    return this.location.url('/registro/credencial')
  }
}

angular
  .module('app')
  .controller('CadastroPerfilController', CadastroPerfilController);
