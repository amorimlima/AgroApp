const fs = require('fs');
const path = require('path');

const appConfig = (app) => {
  const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../commons/database.json')));;

  return { database };
}

module.exports = appConfig;
