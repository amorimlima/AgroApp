(function () {
  "use strict";
  angular
    .module('app')
    .factory('EnderecoHelper', EnderecoHelperFactory);



  function EnderecoHelperFactory() {
    var getCidadeEstado = function getCidadeEstado(Endereco) {
      return Endereco.cidade + ' - ' + Endereco.estado;
    };

    var getFormatado = function (Endereco, cidadeEstado) {
      if (cidadeEstado === null) cidadeEstado = true;
      var formatado = Endereco.logradouro +  ', '  + Endereco.numero;
      if (Endereco.complemento) formatado += ', ' + Endereco.complemento;
      formatado += ' - ' + Endereco.bairro;
      if (cidadeEstado) {
        formatado += ', '  + Endereco.cidade;
        formatado += ' - ' + Endereco.estado;
      }
      formatado += ', '  + Endereco.cep.slice(0,5) + '-' + Endereco.cep.slice(5);

      return formatado;
    };

    return {
      getFormatado: getFormatado,
      getCidadeEstado: getCidadeEstado
    };
  }
})();