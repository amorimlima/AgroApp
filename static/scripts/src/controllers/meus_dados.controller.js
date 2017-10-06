'use strict'

import angular from 'angular'

class MeusDadosController {
  constructor($rootScope, usuario) {
    this.root = $rootScope
    this.usuario = usuario
  }

  static get $inject() {
    return ['$rootScope', 'usuario']
  }
}

angular
  .module('app')
  .controller('MeusDadosController', MeusDadosController)
