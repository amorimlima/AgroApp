(function () {
  angular
    .module('app')
    .controller('SearchController', SearchController);

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
    this.viewState = 'filter';
    this.resultViewState = 'list';

    this.setViewState = function (state) {
      this.viewState = state;
    };

    this.setResultViewState = function (state) {
      this.resultViewState = state;
    };
  }
})();
