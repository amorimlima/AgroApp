SearchController.$inject = [
  '$rootScope',
  'categories',
  'handlings',
  'products'
];

function SearchController($rootScope, categories, handlings, products) {
  $rootScope.view.name = 'Busca';

  this.categories = categories.data;
  this.handlings = handlings.data;
  this.products = products.data;
  this.hasAlreadySearched = false;
  this.searchText = '';

  this.setSearched = function () {
    this.hasAlreadySearched = true;
  };
}

module.exports = SearchController;
