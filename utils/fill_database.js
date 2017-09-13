const fs = require('fs');
const path = require('path');

let modelList = {};

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
  fillTipoTelefone();
}

function fillTipoTelefone() {
  const json = fs.readFileSync(path.join(__dirname, '../mocks/type_tel.json'));
  const types = JSON.parse(json);

  types.forEach((type) => {
    modelList.TipoTelefone.findOrCreate({ where: type, defaults: type });
  });
}

module.exports = models => {
  modelList = models;
  fillCategoria();
};
