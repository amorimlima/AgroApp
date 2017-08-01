const UsuarioService = require('./usuario.service');
const PerfilService = require('./perfil.service');
const CategoriaProdutoService = require('./categoria_produto.service');
const UsuarioProdutoService = require('./usuario_produto.service');
const AutenticacaoService = require('./autenticacao.service');
const CidadeEstadoService = require('./cidade_estado.service');
const PersistenceService = require('./persistence.service');

module.exports = {
  UsuarioService,
  PerfilService,
  CategoriaProdutoService,
  UsuarioProdutoService,
  AutenticacaoService,
  CidadeEstadoService,
  PersistenceService
};
