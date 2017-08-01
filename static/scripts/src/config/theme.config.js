(function () {
  angular
    .module('app')
    .config(themeConfig);

  themeConfig.$inject = [
    '$mdThemingProvider'
  ];

  function themeConfig($mdThemingProvider) {
    $mdThemingProvider.theme('agro')
      .primaryPalette('green')
      .accentPalette('lime');

    $mdThemingProvider.setDefaultTheme('agro');
  }
})();
