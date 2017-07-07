var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

function productsRoute(router) {
  router.get('/', function (req, res) {
    fs.readFileAsync(path.join(__dirname, '../mocks/products.json'))
      .then(function(products) {
        res.json(JSON.parse(products));
      })
  });

  return router;
}

module.exports = productsRoute;
