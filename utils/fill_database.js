var fs = require('fs');
var path = require('path');
var Promise = require('bluebird')

Promise.promisifyAll(fs);

var modelList = {};

function fillCategoria() {
  const json = fs.readFileSync(path.join(__dirname, '../mocks/categories.json'));
  const categories = JSON.parse(json);
  
  categories.forEach((category) => {
    modelList.CategoriaProduto.findOrCreate({ where: category, defaults: category });
  });
  fillProduto();
}

function fillProduto() {
  const json = fs.readFileSync(path.join(__dirname, '../mocks/products.json'))
  const products = JSON.parse(json);

  products.forEach((product) => {
    modelList.Produto.findOrCreate({ where: product, defaults: product });
  });
  fillPerfil();
}

function fillPerfil() {
  const json = fs.readFileSync(path.join(__dirname, '../mocks/profiles.json'));
  const profiles = JSON.parse(json);

  profiles.forEach((profile) => {
    modelList.Perfil.findOrCreate({ where: profile, defaults: profile });
  });
}

module.exports = function (models) {
  modelList = models;
  fillCategoria();
};
