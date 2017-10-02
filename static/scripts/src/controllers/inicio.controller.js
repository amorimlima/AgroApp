'use strict'

import angular from 'angular'

class InicioController {
  constructor($rootScope, $location, $cookies, AutenticacaoService, PersistenceService) {
    this.root = $rootScope
    this.location = $location
    this.cookies = $cookies
    this.authService = AutenticacaoService
    this.persistence = PersistenceService

    this.email = '';
    this.senha = '';
  }

  static get $inject() {
    return ['$rootScope', '$location', '$cookies', 'AutenticacaoService', 'PersistenceService']
  }

  login() {
    return this.authService
      .autenticar(this.email, this.senha)
      .then(response => {
        this.cookies.put('session', response.token, { expires: new Date(2020, 0, 1) });
        this.location.url('/meus-produtos');
        return this.root.$broadcast('login');
      })
      .catch(err => this.root.showToast('Usuário ou senha inválidos'))
  }
}

angular
  .module('app')
  .controller('InicioController', InicioController);
