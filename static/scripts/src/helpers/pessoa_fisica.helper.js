'use strict'

import angular from 'angular'

export class PessoaFisicaHelper {
  static getRgFormatadoDe(Pessoa) {
    if (!Pessoa.PessoaFisica) return null
    const { rg } = Pessoa.PessoaFisica
    return `${ rg.slice(0, 2) }.${ rg.slice(2, 5) }.${ rg.slice(5, 8) }-${ rg.slice(8) }`
  }
}

const getPessoaFisicaHelper = () => PessoaFisicaHelper

angular
  .module('app')
  .factory('PessoaFisicaHelper', getPessoaFisicaHelper)
