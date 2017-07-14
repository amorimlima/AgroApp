var PessoaFisica = require('./pessoa_fisica.model');
var PessoaJuridica = require('./pessoa_juridica.model');
var Endereco = require('./endereco.model');
var Usuario = require('./usuario.model');
var PessoaProduto = require('./pessoa_produto.model');
var Telefone = require('./telefone.model');
var Email = require('./email.model');
var DocumentoCadastro = require('./documento_cadastro.model');
var Favorito = require('./favorito.model');
var Produto = require('./produto.model');
var Perfil = require('./perfil.model');
var CategoriaProduto = require('./categoria_produto.model');
var TipoTelefone = require('./tipo_telefone.model');
var Pessoa = require('./pessoa.model');

module.exports = [
  PessoaFisica,
  PessoaJuridica,
  Endereco,
  Usuario,
  PessoaProduto,
  Telefone,
  Email,
  DocumentoCadastro,
  Favorito,
  Produto,
  Perfil,
  CategoriaProduto,
  TipoTelefone,
  Pessoa
];
