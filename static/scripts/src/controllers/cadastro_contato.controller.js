'use strict'

import angular from 'angular'

class CadastroContatoController {
  constructor($rootScope, $location, $cookies, $mdDialog, PersistenceService, AutenticacaoService, EnderecoService, estados) {
    this.root = $rootScope
    this.location = $location
    this.cookies = $cookies
    this.dialog = $mdDialog
    this.persistence = PersistenceService
    this.authService = AutenticacaoService
    this.enderecoService = EnderecoService
    this.estados = estados

    if (!this.persistence.getSessionItem('usuario')) {
      this.location.url('/registro/perfil')
    }

    this.usuario = JSON.parse(this.persistence.getSessionItem('usuario'))

    if (!this.usuario.Enderecos || !this.usuario.Enderecos[0]) {
      this.resetarEndereco()
    }

    if (!this.usuario.Telefones || !this.usuario.Telefones[0]) {
      Object.assign(this.usuario, { Telefones: [{
        Tipo: null,
        ddd: '',
        numero: ''
      }] })
    }

    this.cepPattern = /\d{5}\-\d{3}/
    this.dddPattern = /\d{2}/
    this.telPattern = /\d{4}\-\d{4}(\d{1})?/
    this.loading = false
  }

  static get $inject() {
    return ['$rootScope', '$location', '$cookies', '$mdDialog', 'PersistenceService', 'AutenticacaoService',
      'EnderecoService', 'estados']
  }

  voltar() {
    if (this.usuario.tipo === 'PF')
      return this.location.url('/registro/pessoa-fisica');
    else
      return this.location.url('/registro/pessoa-juridica');
  }

  avancar() {
    this.persistence.setSessionItem('usuario', JSON.stringify(this.usuario))

    return this.dialog.show({
      contentElement: document.getElementById('terms_of_use_dialog'),
      parent: document.getElementsByTagName('body')[0]
    })
  }

  cancelar() {
    return this.dialog.hide()
  }

  cadastrar() {
    this.dialog.hide()
    this.loading = true

    return this.authService
      .cadastrar(this.usuario)
      .then(() => this.authService.autenticar(this.usuario.Emails[0].email, this.usuario.senha))
      .then(token => {
        this.cookies.put('session', token.token, { expires: new Date(2020, 0, 1) })
        this.location.url('/meus-produtos')

        return this.root.$broadcast('login')
      })
  }

  buscarEnderecoPorCep() {
    return this.enderecoService
      .listarEnderecoPorCep(this.usuario.Enderecos[0].cep)
      .then(endereco => {
        Object.assign(this.usuario.Enderecos[0], {
          logradouro: endereco.logradouro,
          bairro: endereco.bairro,
          estado: endereco.estado,
          cidade: endereco.cidade
        })
      })
      .catch(err => {
        this.root.showToast('CEP não encontrado')
        this.resetarEndereco()
      })
  }

  resetarEndereco() {
    Object.assign(this.usuario, { Enderecos: [{
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }] })
  }
}

angular
  .module('app')
  .controller('CadastroContatoController', CadastroContatoController)
