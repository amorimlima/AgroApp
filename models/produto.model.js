var MODEL_NAME = 'Produto';
var CategoriaProduto = null;

function produtoModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    categoria_produto: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: CategoriaProduto }
    },
    nome: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var options = { tableName: 'produto' };
  var Produto = sequelize.define(MODEL_NAME, constructor, options);

  return Produto;
}

module.exports = function (models) {
  CategoriaProduto = models.CategoriaProduto;

  return { name: MODEL_NAME, constructor: produtoModel };
};
