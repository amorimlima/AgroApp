const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const configs = require('./configs');
const dao = require('./dao');
const routes = require('./routes');

const app = express();
const environment = process.env.NODE_ENV === 'dev'
                    ? 'dev'
                    : 'prod';
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
app.set('auth', configs.auth(app));

// DAO
app.set('dao', dao);

// Authenticatoin
app.use(app.get('auth').initialize());

// Routes
app.use('/auth', routes.authRoute(express.Router(), app));
app.use('/views', routes.viewsRoute(express.Router(), app));
app.use('/usuario', routes.usuarioRoute(express.Router(), app));
app.use('/perfil', routes.perfilRoute(express.Router(), app));
app.use('/categoria', routes.categoriaProdutoRoute(express.Router(), app));
app.use('/email', routes.emailRoute(express.Router(), app));
app.use('/produto', routes.produtoRoute(express.Router(), app));
app.use('/tests', routes.testsRoute(express.Router(), app));

// Views
app.set('views', 'views');
app.set('view engine', 'ejs');

// Common
app.set('strings', strings);

app.get('/', (req, res) => {
  res.render('index', {
    environment,
    strings: app.get('strings')
  });
});

module.exports = app;
