var MODEL_NAME = 'DocumentoCadastro';
var tableName = 'documento_cadastro';

function constructModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: { 
      type: DataType.STRING(200),
      allowNull: false,
      validate: { notEmptY: true }
    },
    diretorio: { 
      type: DataType.STRING(200),
      allowNull: false,
      validate: { notEmptY: true }
    }
  };
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  return Model;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: constructModel };
}
