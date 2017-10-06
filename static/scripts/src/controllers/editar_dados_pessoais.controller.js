'use strict'

import angular from 'angular'

class EditarDadosPessoaisController {
  constructor($rootScope, usuario) {
    this.root = $rootScope
    this.usuario = usuario
    this.form = {}

    if (this.usuario.tipo === 'PF')
      this.data_nascimento = new Date(this.usuario.PessoaFisica.data_nascimento)
    else
      this.data_fundacao = new Date(this.usuario.PessoaJuridica.data_fundacao)
  }

  static get $inject() {
    return ['$rootScope', 'usuario']
  }

  setForm(form) {
    this.form = form
  }
}

angular
  .module('app')
  .controller('EditarDadosPessoaisController', EditarDadosPessoaisController)
