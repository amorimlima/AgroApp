'use strict'

import angular from 'angular'

class CadastroPJController {
  constructor($rootScope, $location, PersistenceService, PessoaJuridicaService) {
    this.root = $rootScope
    this.location = $location
    this.persistence = PersistenceService
    this.pjService = PessoaJuridicaService

    if (!this.persistence.getSessionItem('usuario')) {
      this.location.url('/registro/perfil')
    }

    this.usuario = JSON.parse(this.persistence.getSessionItem('usuario'))

    if (!this.usuario.PessoaJuridica) {
      Object.assign(this.usuario, { PessoaJuridica: {
        cnpj: '',
        razao_social: '',
        responsavel: '',
        data_fundacao: new Date('1991-00-01')
      } })
    }

    this.data_fundacao = new Date(this.usuario.PessoaJuridica.data_fundacao)
    this.cnpjPattern = /\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/
  }

  static get $inject() {
    return ['$rootScope', '$location', 'PersistenceService', 'PessoaJuridicaService']
  }

  voltar() {
    this.location.url('/registro/credencial')
  }

  avancar() {
    this.usuario.PessoaFisica = null
    this.usuario.PessoaJuridica.data_fundacao = this.data_fundacao.toISOString()
    this.persistence.setSessionItem('usuario', JSON.stringify(this.usuario))
    return this.location.url('/registro/contato')
  }

  verificarCnpj(cnpj) {
    return this.pjService
      .listarPorCnpj(cnpj.$modelValue)
      .then(response => {
        if (response) {
          cnpj.$error.em_uso = true
          cnpj.$valid = false
          cnpj.$invalid = true
        }
        else {
          cnpj.$error.em_uso = false
          cnpj.$valid = true
          cnpj.$invalid = false
        }
      })
      .catch(err => this.root.showToast('Não foi possível validar o cnpj'))
  }
}

angular
  .module('app')
  .controller('CadastroPessoaJuridicaController', CadastroPJController)
