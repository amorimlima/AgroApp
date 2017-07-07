themeConfig.$inject = [
  '$mdThemingProvider'
];

function themeConfig($mdThemingProvider) {
  $mdThemingProvider.theme('agro')
    .primaryPalette('green')
    .accentPalette('lime');

  $mdThemingProvider.setDefaultTheme('agro');
}

module.exports = themeConfig;
