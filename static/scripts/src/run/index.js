/**
 * Created by Lucas Tavares on 04/07/2017.
 */

var appRun = require('./app.run');

function run(angular, moduleName) {
  angular
    .module(moduleName)
    .run(appRun);
}

module.exports = run;