(function() {
  angular
    .module('app')
    .config(httpConfig);
  
  httpConfig.$inject = [
    '$httpProvider'
  ];

  function httpConfig() {
    var token = '';
    
    if ('localStorage' in  window) {

    }
  }
})();
