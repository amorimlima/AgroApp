var appRun = require('./app.run');

function run(appModule) {
  appModule.run(appRun);
}

module.exports = run;