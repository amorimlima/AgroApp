const fs = require('fs');
const path = require('path');

const appConfig = (app) => {
  const database = JSON.parse(fs.readFileSync(path.join(__dirname, '../commons/database.json')));
  const jwt = {
    secret: '4gr04pp',
    session: false
  };

  return { database, jwt };
}

module.exports = appConfig;
