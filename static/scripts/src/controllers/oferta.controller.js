(function() {
  angular
    .module('app')
    .controller('OfertaController', OfertaController);

  OfertaController.$inject = [
    'oferta'
  ];

  function OfertaController(oferta) {
    var self = this;
    
    // Models
    self.oferta = oferta;
  }
})();
