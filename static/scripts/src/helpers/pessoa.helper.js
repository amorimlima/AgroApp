import angular from 'angular'

(function() {
  'use strict';

  angular
    .module('app')
    .factory('PessoaHelper', PessoaHelper);

  PessoaHelper.$inject = [
    'PessoaFisicaHelper',
    'EnderecoHelper'
  ];

  function PessoaHelper(PessoaFisicaHelper, EnderecoHelper) {

    var getNomeDaPessoa = function (Pessoa) {
      if (Pessoa.tipo === 'PF')
        return Pessoa.PessoaFisica.nome + ' ' + Pessoa.PessoaFisica.sobrenome;
      else
        return Pessoa.PessoaJuridica.razao_social;
    }

    var getTipoPessoa = function (Pessoa) {
      return Pessoa.tipo === 'PF'
              ? 'Pessoa Física'
              : 'Pessoa Jurídica';
    };

    var getCidadeEstado = function (Pessoa, Endereco) {
      if (!Endereco) Endereco = Pessoa.Enderecos[0];
      return EnderecoHelper.getCidadeEstado(Endereco);
    };

    var getEnderecoCompleto = function (Pessoa, Endereco, cidadeEstado) {
      if (!Endereco) Endereco = Pessoa.Enderecos[0];
      return EnderecoHelper.getFormatado(Endereco, cidadeEstado);
    };

    var getNumeroTelefone = function (Pessoa, Telefone) {
      if (!Telefone) Telefone = Pessoa.Telefones[0];
      var slice = 4;
      var ddd = Telefone.ddd.toString();
      var numero = Telefone.numero.toString();

      if (Telefone.toString().length === 9) slice = 5

      return '(' + ddd + ') ' + numero.substring(0, slice) + '-' + numero.substring(slice);
    };

    var getDocumentoPrincipal = function (Pessoa) {
      var doc = '';
      
      if (Pessoa.tipo === 'PF') {
        doc = Pessoa.PessoaFisica.cpf;
        doc = [ doc.slice(0, 3), doc.slice(3, 6), doc.slice(6, 9) ].join('.') + '-' + doc.slice(9);
      }
      else {
        doc = Pessoa.PessoaJuridica.cnpj;
        doc = [ doc.slice(0,2), doc.slice(2, 5), doc.slice(5, 8) ].join('.') + 
              '/' + doc.slice(8, 12) + '-' + doc.slice(12)
      }

      return doc;
    };

    var getRgFormatadoDe = function (Pessoa) {
      return PessoaFisicaHelper.getRgFormatadoDe(Pessoa);
    };

    return {
      getNomeDaPessoa: getNomeDaPessoa,
      getCidadeEstado: getCidadeEstado,
      getEnderecoCompleto: getEnderecoCompleto,
      getTipoPessoa: getTipoPessoa,
      getNumeroTelefone: getNumeroTelefone,
      getDocumentoPrincipal: getDocumentoPrincipal,
      getRgFormatadoDe: getRgFormatadoDe
    };
  }
})();