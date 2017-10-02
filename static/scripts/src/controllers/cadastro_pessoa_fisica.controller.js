'use strict'

import angular from 'angular'

class CadastroPFController {
  constructor($rootScope, $location, PersistenceService, PessoaFisicaService) {
    this.root = $rootScope
    this.location = $location
    this.persistence = PersistenceService
    this.pfService = PessoaFisicaService

    if (!JSON.parse(this.persistence.getSessionItem('usuario'))) {
      this.location.url('/registro/perfil')
    }

    this.usuario = JSON.parse(this.persistence.getSessionItem('usuario'))

    if (!this.usuario.PessoaFisica) {
      Object.assign(this.usuario, {
        PessoaFisica: {
          cpf: '',
          rg: '',
          nome: '',
          sobrenome: '',
          data_nascimento: new Date('1988-00-01')
        }
      })
    }

    this.data_nascimento = new Date(this.usuario.PessoaFisica.data_nascimento)
    this.cpfPattern = /\d{3}\.\d{3}\.\d{3}\-\d{2}/
  }

  static get $inject() {
    return ['$rootScope', '$location', 'PersistenceService', 'PessoaFisicaService']
  }

  voltar() {
    return this.location.url('/registro/credencial')
  }

  avancar() {
    this.usuario.PessoaJuridica = null
    this.usuario.PessoaFisica.data_nascimento = this.data_nascimento.toISOString()
    this.persistence.setSessionItem('usuario', JSON.stringify(this.usuario))
    return this.location.url('/registro/contato')
  }

  verificarCpf(cpf) {
    return this.pfService
      .listarPorCpf(cpf.$modelValue)
      .then(response => {
        if (response) {
          cpf.$error.em_uso = true
          cpf.$valid = false
          cpf.$invalid = true
        }
        else {
          cpf.$error.em_uso = false
          cpf.$valid = true
          cpf.$invalid = false
        }
      })
      .catch(error => this.root.showDialog('Não foi possível validar o cpf'))
  }
}

angular
  .module('app')
  .controller('CadastroPessoaFisicaController', CadastroPFController)
