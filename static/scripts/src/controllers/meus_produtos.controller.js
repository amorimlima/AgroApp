function MyProductsController($rootScope, CategoriaProdutoService) { 
  this.$rootScope = $rootScope;

  this.createOffer = () => {
    return this.OfferService
      .createOffer(this.offer)
      .then(offer => Promise.resolve(this.produtos.unshift(offer)));
  }

  this.getFormatedDate = (date) => {
    const newDate = date.split('-');
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }
};

MyProductsController.$inject = [
  '$rootScope',
  'CategoriaProdutoService'
];

module.exports = MyProductsController;
