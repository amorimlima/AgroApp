var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, './static')));

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = app;
