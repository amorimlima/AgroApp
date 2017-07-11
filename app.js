var path = require('path');
var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var configs = require('./configs');
var routes = require('./routes');

var app = express();
var environment = app.get('env') === 'development' ? 'dev' : 'prod';
var strings = JSON.parse(fs.readFileSync(path.join(__dirname, './commons/strings.json')));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, './static')));

// configs
app.set('configs', configs.app(app))
app.set('datasource', configs.datasource(app));
app.set('models', configs.models(app));

// Routes
app.use('/categories', routes.categories(express.Router(), app));
app.use('/products', routes.products(express.Router(), app));
app.use('/handlings', routes.handlings(express.Router(), app));
app.use('/views', routes.views(express.Router(), app));
app.use('/offers', routes.offers(express.Router(), app));

// Views
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {
    environment: environment,
    strings: app.get('strings')
  });
});

module.exports = app;
