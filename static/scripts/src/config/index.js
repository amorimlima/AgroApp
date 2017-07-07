var themeConfig = require('./theme.config');
var routeConfig = require('./route.config');

function config(appModule) {
  appModule.config(routeConfig);
  appModule.config(themeConfig);
}

module.exports = config;
