var categoriesRoute = require('./categories.route');
var productsRoute = require('./products.route');
var handlingsRoute = require('./handlings.route');
var viewsRoute = require('./views.route');
var offersRoute = require('./offers.route');

module.exports = {
  categories: categoriesRoute,
  products: productsRoute,
  handlings: handlingsRoute,
  views: viewsRoute,
  offers: offersRoute
};
