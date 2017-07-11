var fs = require('fs');
var path = require('path');

function appConfig(app) {
  var database = JSON.parse(fs.readFileSync(path.join(__dirname, '../commons/database.json')));
  var config = { database: database };

  return config;
}

module.exports = appConfig;
