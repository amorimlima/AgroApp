const autenticacaoRoute = require('./autenticacao.route');
const viewsRoute = require('./views.route');
const usuarioRoute = require('./usuario.route');
const perfilRoute = require('./perfil.route');
const categoriaProdutoRoute = require('./categoria_produto.route');
const emailRoute = require('./email.route');
const produtoRoute = require('./produto.route');
const testsRoute = require('./tests.route');
const usuarioProdutoRoute = require('./usuario_produto.route');
const enderecoRoute = require('./endereco.route');
const pessoaFisicaRoute = require('./pessoa_fisica.route');
const pessoaJuridicaRoute = require('./pessoa_juridica.route');

module.exports = {
  autenticacaoRoute,
  viewsRoute,
  usuarioRoute,
  perfilRoute,
  categoriaProdutoRoute,
  emailRoute,
  produtoRoute,
  testsRoute,
  usuarioProdutoRoute,
  enderecoRoute,
  pessoaFisicaRoute,
  pessoaJuridicaRoute
};
