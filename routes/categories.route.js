var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

function categoriesRoute(router) {
  router.get('/', function (req, res) {
    fs.readFileAsync(path.join(__dirname, '../mocks/categories.json'))
      .then(function (file) {
        res.json(JSON.parse(file));
      });
  });

  return router;
}

module.exports = categoriesRoute;