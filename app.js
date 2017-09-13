const fs = require('fs');
const { join } = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { extractToken, maxAge, noCache } = require('./middlewares');
const dao = require('./dao');
const routes = require('./routes');
const configs = require('./configs');

const { static, Router } = express;
const app = express();
const environment = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod';
const strings = JSON.parse(fs.readFileSync(join(__dirname, './commons/strings.json')));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(extractToken(app));

// Static Files
app.use('/assets/styles', noCache(), static(join(__dirname, './static/styles')));
app.use('/assets/images', maxAge('30d'), static(join(__dirname, './static/images')));
app.use('/assets/scripts/lib', maxAge('30d'), static(join(__dirname, './static/scripts/lib')));
app.use('/assets/scripts/bin', noCache(), static(join(__dirname, './static/scripts/bin')));
app.use('/assets/scripts/src', noCache(), static(join(__dirname, './static/scripts/src')));

// Common
app.set('strings', strings);

// Configs
app.set('configs', configs.app(app))
app.set('datasource', configs.datasource(app));
app.set('models', configs.models(app));
app.set('auth', configs.auth(app));

// DAO
app.set('dao', dao);

// Routes
app.use('/views', routes.views(Router(), app));
app.use('/email', routes.email(Router(), app));
app.use('/tests', routes.tests(Router(), app));
app.use('/perfil', routes.perfil(Router(), app));
app.use('/usuario', routes.usuario(Router(), app));
app.use('/produto', routes.produto(Router(), app));
app.use('/endereco', routes.endereco(Router(), app));
app.use('/favorito', routes.favorito(Router(), app));
app.use('/oferta', routes.usuarioProduto(Router(), app));
app.use('/autenticacao', routes.autenticacao(Router(), app));
app.use('/categoria', routes.categoriaProduto(Router(), app));
app.use('/pessoa-fisica', routes.pessoaFisica(Router(), app));
app.use('/pessoa-juridica', routes.pessoaJuridica(Router(), app));

// Views
app.set('views', 'views');
app.set('view engine', 'ejs');

// Root Requests
app.get('/', noCache(), (req, res) => 
  res.render('index', { environment, strings }));

app.get('/sw.js', noCache(), (req, res) => 
  res.sendFile(join(__dirname, './sw.js')));

app.get('/manifest.json', noCache(), (req, res) =>
  res.sendFile(join(__dirname, './manifest.json')));

module.exports = app;