var Pessoa = require('./pessoa.model');
var Perfil = require('./perfil.model');
var PessoaFisica = require('./pessoa_fisica.model');
var PessoaJuridica = require('./pessoa_juridica.model');
var Usuario = require('./usuario.model');
var CategoriaProduto = require('./categoria_produto.model');
var Produto = require('./produto.model');
var Favorito = require('./favorito.model');
var PessoaProduto = require('./pessoa_produto.model');
var Endereco = require('./endereco.model');
var Email = require('./email.model');
var TipoTelefone = require('./tipo_telefone.model');
var Telefone = require('./telefone.model');
var DocumentoCadastro = require('./documento_cadastro.model');

module.exports = [
  Pessoa,
  PessoaFisica,
  PessoaJuridica,
  Usuario,
  CategoriaProduto,
  Produto,
  Favorito,
  PessoaProduto,
  Endereco,
  Email,
  TipoTelefone,
  Telefone,
  DocumentoCadastro
];
