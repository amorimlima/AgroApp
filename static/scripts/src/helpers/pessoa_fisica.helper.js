import angular from 'angular'

(function () {
  angular
    .module('app')
    .factory('PessoaFisicaHelper', PessoaFisicaHelperFactory);

  PessoaFisicaHelperFactory.$inject = [];

  function PessoaFisicaHelperFactory() {
    "use strict";

    var getRgFormatadoDe = function (Pessoa) {
      if (!Pessoa.PessoaFisica) return null;
      var doc = Pessoa.PessoaFisica.rg;
      return [ doc.slice(0, 2), doc.slice(2, 5), doc.slice(5, 8) ].join('.') + '-' + doc.slice(8);
    };

    return {
      getRgFormatadoDe: getRgFormatadoDe
    };
  }
})();
