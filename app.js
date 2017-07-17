const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const configs = require('./configs');
const dao = require('./dao');
const routes = require('./routes');

const app = express();
const environment = app.get('env') === 'development' ? 'dev' : 'prod';
const strings = JSON.parse(fs.readFileSync(path.join(__dirname, './commons/strings.json')));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, './static')));

// configs
app.set('configs', configs.app(app))
app.set('datasource', configs.datasource(app));
app.set('models', configs.models(app));

// DAO
app.set('dao', dao);

// Routes
app.use('/usuario', routes.usuario(express.Router(), app));

// Views
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {
    environment: environment,
    strings: app.get('strings')
  });
});

module.exports = app;
