const fs = require('fs');
const path = require('path');

const appConfig = (app) => {
  const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../commons/database.json')));
  const jwt = {
    secret: '4gr03c0n0m14'
  };

  return { database, jwt };
}

module.exports = appConfig;
