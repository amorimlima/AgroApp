var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

function offersRoute(router, app) {
  router.get('/', function (req, res) {
    var requestedHandlings = req.query.handlings.split(',');
    var requestedCategories = req.query.categories.split(',');

    var handlings  = JSON
      .parse(fs.readFileSync(path.join(__dirname, '../mocks/handlings.json')))
      .filter(function (handling) { return requestedHandlings.includes(handling.id) });

    var categories  = JSON
      .parse(fs.readFileSync(path.join(__dirname, '../mocks/categories.json')))
      .filter(function (categories) { return requestedCategories.includes(categories.id) });

    var products  = JSON
      .parse(fs.readFileSync(path.join(__dirname, '../mocks/products.json')))
      .filter(function (product) { return product.name.includes(req.query.searchText)});

    var offers = JSON
      .parse(fs.readFileSync(path.join(__dirname, '../mocks/products.json')))
      .filter(function(offer) { return  })

  });

  return router;
}

module.exports = offersRoute;
