import fs from 'fs';
import path from 'path'
import dotenv from 'dotenv'

const appConfig = (app) => {
  if (process.env.NODE_ENV !== 'prod') {
    dotenv.config({ path: path.join(__dirname, '../env/dev.env') })
  }

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
      },
      logging: false
    }
  };
  const jwt = {
    secret: '4gr04pp',
    session: false
  };

  return { database, jwt };
}

module.exports = appConfig;
