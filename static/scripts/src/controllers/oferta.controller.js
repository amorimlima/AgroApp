(function() {
  angular
    .module('app')
    .controller('OfertaController', OfertaController);

  OfertaController.$inject = [
    'oferta'
  ];

  function OfertaController(oferta) {
    var vm = this;
  }
})();
