class MyProductsController {
  constructor($rootScope, CategoriaProdutoService) {
    this.$rootScope = $rootScope;
    this.offer = {};
    this.ofertass = [{
      id: 1,
      unidade: 'kg',
      quantidade: 800,
      data_inicio: '2017-04-19',
      data_fim: '2017-09-21',
      ativo: 1,
      produto: {
        id: 1,
        nome: 'Banana',
        categoria: 1
      }
    },
    {
      id: 1,
      unidade: 'kg',
      quantidade: 800,
      data_inicio: '2017-04-19',
      data_fim: '2017-09-21',
      ativo: 1,
      produto: {
        id: 1,
        nome: 'Banana',
        categoria: 1
      }
    },
    {
      id: 1,
      unidade: 'kg',
      quantidade: 800,
      data_inicio: '2017-04-19',
      data_fim: '2017-09-21',
      ativo: 1,
      produto: {
        id: 1,
        nome: 'Banana',
        categoria: 1
      }
    },
    {
      id: 1,
      unidade: 'kg',
      quantidade: 800,
      data_inicio: '2017-04-19',
      data_fim: '2017-09-21',
      ativo: 1,
      produto: {
        id: 1,
        nome: 'Banana',
        categoria: 1
      }
    },
    {
      id: 1,
      unidade: 'kg',
      quantidade: 800,
      data_inicio: '2017-04-19',
      data_fim: '2017-09-21',
      ativo: 1,
      produto: {
        id: 1,
        nome: 'Banana',
        categoria: 1
      }
    }];
  }

  createOffer() {
    return this.OfferService
      .createOffer(this.offer)
      .then(offer => Promise.resolve(this.produtos.unshift(offer)));
  }

  getFormatedDate(date) {
    const newDate = date.split('-');
    return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
  }
};

MyProductsController.$inject = [
  '$rootScope',
  'CategoriaProdutoService'
];

module.exports = MyProductsController;
