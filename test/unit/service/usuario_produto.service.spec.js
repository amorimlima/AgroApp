const UsuarioProdutoService = require('../../../static/scripts/src/services').UsuarioProdutoService;

describe('UsuarioProdutoService', () => {
  const $http = {
    post: td.function()
  };
  const defaultOferta = {
    id: 1,
    usuario: 1,
    produto: 1,
    unidade: 'kg',
    quantidade: 500,
    data_inicio: '2017-04-11',
    data_fim: '2017-09-13',
    ativo: 1
  };
  let usuarioProdutoService = null;

  beforeEach(() => {
    usuarioProdutoService = new UsuarioProdutoService($http);
  });

  it('#createOffer deveria criar um novo UsuarioProduto', (done) => {
    const offer = {
      usuario: 1,
      produto: 1,
      unidade: 'kg',
      quantidade: 500,
      data_inicio: '2017-04-11',
      data_fim: '2017-09-13'
    };
    
    td.when($http.post('/produto/oferta', offer)).thenResolve({ data: defaultOferta });

    usuarioProdutoService
      .createOffer(offer)
      .then((response) => {
        expect(response.usuario).to.be.eql(defaultOferta.usuario);
        expect(response.produto).to.be.eql(defaultOferta.produto);
        expect(response.unidade).to.be.eql(defaultOferta.unidade);
        expect(response.quantidade).to.be.eql(defaultOferta.quantidade);
        expect(response.data_inicio).to.be.eql(defaultOferta.data_inicio);
        expect(response.data_fim).to.be.eql(defaultOferta.data_fim);
        expect(response.ativo).to.be.eql(defaultOferta.ativo);
        done();
      })
  });
})