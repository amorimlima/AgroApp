var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var routes = require('./routes');

var app = express();
var environment = app.get('env') === 'development' ? 'dev' : 'prod';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, './static')));

app.use('/categories', routes.categories(express.Router()));
app.use('/products', routes.products(express.Router()));
app.use('/handlings', routes.handlings(express.Router()));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.render('index', { environment: environment });
});

module.exports = app;
