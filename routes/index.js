var categoriesRoute = require('./categories.route');
var productsRoute = require('./products.route');
var handlingsRoute = require('./handlings.route');

module.exports = {
  categories: categoriesRoute,
  products: productsRoute,
  handlings: handlingsRoute
};
