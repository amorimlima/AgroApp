var MODEL_NAME = 'Produto';
var tableName = 'produto';

var UsuarioProduto = null;

function constructModel(sequelize, DataType) {
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
  var options = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, options);

  Model.hasMany(UsuarioProduto, { foreignKey: tableName });

  return Model;
}

module.exports = function (models) {
  UsuarioProduto = models.UsuarioProduto;

  return { name: MODEL_NAME, constructor: constructModel };
};
