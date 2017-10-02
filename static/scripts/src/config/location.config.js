import angular from 'angular'

(function() {
  angular
    .module('app')
    .config(locationConfig);

  locationConfig.$inject = [
    '$locationProvider'
  ];

  function locationConfig($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode({ enabled: false });
  }
})();
