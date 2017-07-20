const PessoaFisica = require('./pessoa_fisica.model');
const PessoaJuridica = require('./pessoa_juridica.model');
const Endereco = require('./endereco.model');
const Credencial = require('./credencial.model');
const UsuarioProduto = require('./usuario_produto.model');
const Telefone = require('./telefone.model');
const Email = require('./email.model');
const DocumentoCadastro = require('./documento_cadastro.model');
const Favorito = require('./favorito.model');
const Produto = require('./produto.model');
const Perfil = require('./perfil.model');
const CategoriaProduto = require('./categoria_produto.model');
const TipoTelefone = require('./tipo_telefone.model');
const Usuario = require('./usuario.model');

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
