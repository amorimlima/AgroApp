class MyProductsController {
  constructor($rootScope, UsuarioProdutoService) {
    this.rootScope = $rootScope;
    this.OfferService = UsuarioProdutoService;
    this.offer = {};
    this.produtos = [];
    this.rootScope.view.name = 'Meus Produtos';
  }

  createOffer() {
    return this.OfferService
      .createOffer(this.offer)
      .then(offer => Promise.resolve(this.produtos.unshift(offer)));
  }
};

MyProductsController.$inject = [
  '$rootScope',
  'UsuarioProdutoService'
];

module.exports = MyProductsController;
