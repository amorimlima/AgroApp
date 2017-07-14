var fs = require('fs');
var path = require('path');
var Promise = require('bluebird')

Promise.promisifyAll(fs);

var modelList = {};

function fillCategoria() {
  fs.readFileAsync(path.join(__dirname, '../mocks/categories.json'))
    .then(function (json) {
      JSON.parse(json)
        .forEach(function (categoria) {
          modelList.CategoriaProduto.findOrCreate({ where: categoria, defaults: categoria })
            .then(function (created) {
              fillProduto();
            });
        });
    });
}

function fillProduto() {
  fs.readFileAsync(path.join(__dirname, '../mocks/products.json'))
    .then(function (json) {
      JSON.parse(json)
        .forEach(function (produto) {
          modelList.Produto.findOrCreate({ where: produto, defaults: produto })
            .then(function (created) {
              fillPerfil()
            });
        });
    });
}

function fillPerfil() {
  fs.readFileAsync(path.join(__dirname, '../mocks/profiles.json'))
    .then(function (json) {
      JSON.parse(json)
        .forEach(function (perfil) {
          modelList.Perfil.findOrCreate({ where: perfil, defaults: perfil })
            .then(function (created) {
            });
        });
    });
}

module.exports = function (models) {
  modelList = models;
  fillCategoria();
};
