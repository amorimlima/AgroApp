SearchController.$inject = [
  '$rootScope'
];

function SearchController($rootScope) {
  $rootScope.view.name = 'Busca';

  this.categories = [
    { name: 'Frutas' },
    { name: 'Verduras' },
    { name: 'Legumes' },
    { name: 'Temperos' },
    { name: 'Ovos' },
    { name: 'Laticínios' },
    { name: 'Flores' },
    { name: 'Mel' },
    { name: 'Diversos' }
  ];

  this.handlings = [
    { name: 'Convencional' },
    { name: 'Agroecológico' },
    { name: 'Orgânico' }
  ];

  this.hasAlreadySearched = false;
  this.query = '';
  this.searchText = 'Churros';
  this.searchItems = [
    { name: 'Resultado 1' },
    { name: 'Resultado 2' },
    { name: 'Resultado 3' },
    { name: 'Resultado 4' },
    { name: 'Resultado 5' },
    { name: 'Resultado 6' },
    { name: 'Resultado 7' },
    { name: 'Resultado 8' }
  ];

  this.setSearched = function () {
    this.hasAlreadySearched = true;
  };
}

module.exports = SearchController;
