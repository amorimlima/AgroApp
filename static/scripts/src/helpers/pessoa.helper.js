(function() {
  angular
    .module('app')
    .factory('PessoaHelper', PessoaHelper);

  PessoaHelper.$inject = [];

  function PessoaHelper() {

    function getNomeDaPessoa(Pessoa) {
      if (Pessoa.tipo === 'PF')
        return Pessoa.PessoaFisica.nome + ' ' + Pessoa.PessoaFisica.sobrenome;
      else
        return Pessoa.PessoaJuridica.razao_social;
    }

    function getTipoPessoa(Pessoa) {
      return Pessoa.tipo === 'PF'
              ? 'Pessoa Física'
              : 'Pessoa Jurídica';
    }

    function getCidadeEstado(Pessoa, Endereco) {
      if (!Endereco) Endereco = Pessoa.Enderecos[0];
      return Endereco.cidade + ' - ' + Endereco.estado;
    }

    function getNumeroTelefone(Pessoa, Telefone) {
      if (!Telefone) Telefone = Pessoa.Telefones[0];
      var slice = 4;
      var ddd = Telefone.ddd.toString();
      var numero = Telefone.numero.toString();

      if (Telefone.toString().length === 9) slice = 5

      return '(' + ddd + ') ' + numero.substring(0, slice) + '-' + numero.substring(slice);
    }

    return {
      getNomeDaPessoa: getNomeDaPessoa,
      getCidadeEstado: getCidadeEstado,
      getTipoPessoa: getTipoPessoa,
      getNumeroTelefone: getNumeroTelefone
    };
  }
})();
