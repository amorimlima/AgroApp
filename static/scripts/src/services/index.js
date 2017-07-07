var CategoriesService = require('./categories.service');
var ProductsService = require('./products.service');
var HandlingsService = require('./handlings.service');

function services(appModule) {
  appModule.service('CategoriesService', CategoriesService);
  appModule.service('ProductsService', ProductsService);
  appModule.service('HandlingsService', HandlingsService);
}

module.exports = services;
