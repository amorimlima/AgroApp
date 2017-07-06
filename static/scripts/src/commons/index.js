var strings = require('./strings');

function commons(appModule) {
  appModule.constant('strings', strings);
}

module.exports = commons;