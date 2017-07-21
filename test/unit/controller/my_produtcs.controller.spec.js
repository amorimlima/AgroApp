const MyProductsController = require('../../../static/scripts/src/controllers').MyProductsController;

describe('MyProductsController', () => {
  const UsuarioProdutoService = {
    createOffer: td.function()
  };
  const $rootScope = { view: {} };
  const defaultOffer = {
    id: 1,
    usuario: 1,
    produto: 1,
    unidade: 'kg',
    quantidade: 500,
    data_inicio: '2017-04-21',
    data_fim: '2017-09-14',
    ativo: 1
  };

  let myProductsController = null;

  beforeEach(() => {
    myProductsController = new MyProductsController($rootScope, UsuarioProdutoService);
  });

  it('#createOffer deveria criar uma nova oferta', (done) => {
    myProductsController.offer.usuario = 1;
    myProductsController.offer.produto = 1;
    myProductsController.offer.unidade = 'kg',
    myProductsController.offer.quantidade = 500,
    myProductsController.offer.data_inicio = '2017-04-21';
    myProductsController.offer.data_fim = '2017-09-14';

    td.when(UsuarioProdutoService.createOffer(myProductsController.offer))
      .thenResolve(defaultOffer);
    
    myProductsController
      .createOffer()
      .then(() => {
        expect(myProductsController.produtos[0].usuario).to.be.eql(defaultOffer.usuario);
        expect(myProductsController.produtos[0].produto).to.be.eql(defaultOffer.produto);
        expect(myProductsController.produtos[0].unidade).to.be.eql(defaultOffer.unidade);
        expect(myProductsController.produtos[0].quantidade).to.be.eql(defaultOffer.quantidade);
        expect(myProductsController.produtos[0].data_inicio).to.be.eql(defaultOffer.data_inicio);
        expect(myProductsController.produtos[0].data_fim).to.be.eql(defaultOffer.data_fim);
        done();
      });
  });
});
