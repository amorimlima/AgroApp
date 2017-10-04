'use strict'

import angular from 'angular'
import { PessoaFisicaHelper } from './pessoa_fisica.helper'
import { EnderecoHelper } from './endereco.helper'

export class PessoaHelper {
  static getNomeDaPessoa(Pessoa) {
    if (Pessoa.tipo === 'PF')
      return Pessoa.PessoaFisica.nome + ' ' + Pessoa.PessoaFisica.sobrenome;
    else
      return Pessoa.PessoaJuridica.razao_social;
  }

  static getTipoPessoa(Pessoa) {
    return Pessoa.tipo === 'PF'
            ? 'Pessoa Física'
            : 'Pessoa Jurídica'
  }

  static getEnderecoCompleto(Pessoa, Endereco = Pessoa.Enderecos[0], cidadeEstado = true) {
    return EnderecoHelper.getFormatado(Endereco, cidadeEstado)
  }

  static getCidadeEstado(Pessoa, Endereco = Pessoa.Enderecos[0]) {
    return EnderecoHelper.getCidadeEstado(Endereco);
  }

  static getNumeroTelefone(Pessoa, Telefone = Pessoa.Telefones[0]) {
    const ddd = Telefone.ddd.toString()
    const numero = Telefone.numero.toString()
    let slice = 4

    if (Telefone.toString().length === 9) slice = 5

    return `(${ ddd }) ${ numero.substring(0, slice) }-${ numero.substring(slice) }`
  }

  static getDocumentoPrincipal(Pessoa) {
    let doc = '';

    if (Pessoa.tipo === 'PF') {
      doc = Pessoa.PessoaFisica.cpf;
      doc = [ doc.slice(0, 3), doc.slice(3, 6), doc.slice(6, 9) ].join('.') + '-' + doc.slice(9);
    }
    else {
      doc = Pessoa.PessoaJuridica.cnpj;
      doc = `${ doc.slice(0, 2) }.${ doc.slice(2, 5) }.${ doc.slice(5, 8) }/${ doc.slice(8, 12) }-${ doc.slice(12) }`
    }

    return doc;
  }

  static getRgFormatado(Pessoa) {
    return PessoaFisicaHelper.getRgFormatadoDe(Pessoa);
  }
}

const getPessoaHelper = () => PessoaHelper

angular
  .module('app')
  .factory('PessoaHelper', getPessoaHelper)
