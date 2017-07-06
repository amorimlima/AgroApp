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
  ]
}

module.exports = SearchController;
