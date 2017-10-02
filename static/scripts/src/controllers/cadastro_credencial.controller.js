'use strict'

import angular from 'angular'

class CadastroCredencialController {
  constructor($rootScope, $location, PersistenceService, EmailService) {
    this.root = $rootScope
    this.location = $location
    this.persistence = PersistenceService
    this.emailService = EmailService

    if (!this.persistence.getSessionItem('usuario')) {
      this.location.url('/registro/perfil')
    }

    this.usuario = JSON.parse(this.persistence.getSessionItem('usuario'))

    if (!this.usuario.Emails || !this.usuario.Emails[0]) {
      Object.assign(this.usuario, { Emails: [{ email: '' }] })
    }

    this.emailEmUso = false
  }

  static get $inject() {
    return ['$rootScope', '$location', 'PersistenceService', 'EmailService']
  }

  voltar() {
    return this.location.url('/registro/perfil')
  }

  setForm(form) {
    this.form = form
  }

  verificarEmail(email) {
    this.emailService
      .listarPorEndereco(email.$modelValue)
      .then(response => {
        if (response) {
          email.$error.em_uso = true;
          email.$valid = false;
          email.$invalid = true;
        }
        else {
          email.$error.em_uso = false;
          email.$valid = true;
          email.$invalid = false;
        }
      })
      .catch(error => console.log('Erro ao validar email'))
  }

  avancar(tipo) {
    this.persistence.setSessionItem('usuario', JSON.stringify(this.usuario))
    return this.location.url(`/registro/${tipo}`)
  }
}

angular
  .module('app')
  .controller('CadastroCredencialController', CadastroCredencialController)
