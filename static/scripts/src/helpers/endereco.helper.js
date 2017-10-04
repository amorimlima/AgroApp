'use strict'

import angular from 'angular'

export class EnderecoHelper {
  static getCidadeEstado(endereco) {
    return `${endereco.cidade} - ${endereco.estado}`
  }

  static getFormatado(Endereco, cidadeEstado = true) {
    let formatado = Endereco.logradouro +  ', '  + Endereco.numero

    if (Endereco.complemento) {
      formatado += ', ' + Endereco.complemento
    }

    formatado += ' - ' + Endereco.bairro

    if (cidadeEstado) {
      formatado += ', '  + Endereco.cidade
      formatado += ' - ' + Endereco.estado
    }
    formatado += ', '  + Endereco.cep.slice(0,5) + '-' + Endereco.cep.slice(5)

    return formatado
  }
}

const getEnderecoHelper = () => EnderecoHelper

angular
  .module('app')
  .factory('EnderecoHelper', getEnderecoHelper)
