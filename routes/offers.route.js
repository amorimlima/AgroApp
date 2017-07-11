var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

function offersRoute(router, app) {
  router.get('/', function (req, res) {
    var requestedHandlings = req.query.handlings.split(',');
    var requestedCategories = req.query.categories.split(',');

  });

  return router;
}

module.exports = offersRoute;
