var MODEL_NAME = 'CategoriaProduto';
var Produto = null;

function pessoaModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    }
  };
  var configs = { tableName: 'categoria_produto' }
  var CategoriaProduto = sequelize.define(MODEL_NAME, constructor, configs);

  CategoriaProduto.hasMany(Produto, { foreignKey: 'categoria' });

  return CategoriaProduto;
}

module.exports = function (models) {
  Produto = models.Produto;

  return { name: MODEL_NAME, constructor: pessoaModel };
};
