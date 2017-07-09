var path = require('path');
var fs = require('fs');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var routes = require('./routes');

var app = express();
var environment = app.get('env') === 'development' ? 'dev' : 'prod';
var strings = JSON.parse(fs.readFileSync(path.join(__dirname, './commons/strings.json')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, './static')));

app.use('/categories', routes.categories(express.Router(), app));
app.use('/products', routes.products(express.Router(), app));
app.use('/handlings', routes.handlings(express.Router(), app));
app.use('/views', routes.views(express.Router(), app));

app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('strings', strings);

app.get('/', function(req, res) {
  res.render('index', {
    environment: environment,
    strings: app.get('strings')
  });
});

module.exports = app;
