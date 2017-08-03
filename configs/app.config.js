const fs = require('fs');
const path = require('path');
const jwtSimple = require('jwt-simple');

const appConfig = (app) => {
  const database = {
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "mysql",
      define: {
        underscored: true
      }
    }
  };
  const jwt = {
    secret: '4gr04pp',
    session: false,
    decode: jwtSimple.decode.bind(jwtSimple)
  };

  return { database, jwt };
}

module.exports = appConfig;
