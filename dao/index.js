const GenericDAO = require('./generic.dao');
const UsuarioDAO = require('./usuario.dao');
const PessoaJuridicaDAO = require('./pessoa_juridica.dao');
const PessoaFisicaDAO = require('./pessoa_fisica.dao');
const PerfilDAO = require('./perfil.dao');
const EnderecoDAO = require('./endereco.dao');
const EmailDAO = require('./email.dao');
const ProdutoDAO = require('./produto.dao');
const TipoTelefoneDAO = require('./tipo_telefone.dao');
const TelefoneDAO = require('./telefone.dao');
const CategoriaProdutoDAO = require('./categoria_produto.dao');
const UsuarioProdutoDAO = require('./usuario_produto.dao');
const FavoritoDAO = require('./favorito.dao');

module.exports = {
  GenericDAO,
  UsuarioDAO,
  PessoaJuridicaDAO,
  PessoaFisicaDAO,
  PerfilDAO,
  EnderecoDAO,
  EmailDAO,
  ProdutoDAO,
  TipoTelefoneDAO,
  TelefoneDAO,
  CategoriaProdutoDAO,
  UsuarioProdutoDAO,
  FavoritoDAO
};
