var MODEL_NAME = 'UsuarioProduto';
var tableName = 'usuario_produto';

function constructModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unidade: {
      type: DataType.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    quantidade: {
      type: DataType.INTEGER,
      allowNull: false
    },
    data_inicio: {
      type: DataType.DATE,
      allowNull: false,
      validate: { notEmpty: true }
    },
    data_fim: {
      type: DataType.DATE,
      allowNull: false,
      validate: { notEmpty: true }
    },
    ativo: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  };
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  return Model;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: constructModel };
};
