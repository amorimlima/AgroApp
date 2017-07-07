var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');

Promise.promisifyAll(fs);

function handlingsRoute(router) {
  router.get('/', function (req, res) {
    fs.readFileAsync(path.join(__dirname, '../mocks/handlings.json'))
      .then(function (handlings) {
        res.json(JSON.parse(handlings));
      });
  });

  return router;
}

module.exports = handlingsRoute;