const CategoriaProdutoService = require('../../../static/scripts/src/services').CategoriaProdutoService;

describe('CategoriaProdutoService', () => {
  const defaultCategoriaProduto = {
    id: 1,
    nome: 'Legumes e Verduras'
  };
  const $http = {
    get: td.function(),
    post: td.function(),
    put: td.function(),
    delete: td.function()
  };
  let categoriaProdutoService = null;

  beforeEach(() => {
    categoriaProdutoService = new CategoriaProdutoService($http);
  });

  it('#getAll deveria retornar a lista de categorias de produtos', (done) => {
    td.when($http.get('/categoria'))
      .thenResolve({ data: [ defaultCategoriaProduto ] });

    categoriaProdutoService
      .getAll()
      .then((categorias) => {
        expect(categorias[0].nome).to.be.eql(defaultCategoriaProduto.nome);
        done();
      });
  });
});
