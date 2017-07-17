var PessoaFisica = require('./pessoa_fisica.model');
var PessoaJuridica = require('./pessoa_juridica.model');
var Endereco = require('./endereco.model');
var Credencial = require('./credencial.model');
var UsuarioProduto = require('./usuario_produto.model');
var Telefone = require('./telefone.model');
var Email = require('./email.model');
var DocumentoCadastro = require('./documento_cadastro.model');
var Favorito = require('./favorito.model');
var Produto = require('./produto.model');
var Perfil = require('./perfil.model');
var CategoriaProduto = require('./categoria_produto.model');
var TipoTelefone = require('./tipo_telefone.model');
var Usuario = require('./usuario.model');

module.exports = [
  Favorito,
  PessoaFisica,
  PessoaJuridica,
  Email,
  Endereco,
  Credencial,
  UsuarioProduto,
  Telefone,
  TipoTelefone,
  DocumentoCadastro,
  Perfil,
  Produto,
  CategoriaProduto,
  Usuario
];
