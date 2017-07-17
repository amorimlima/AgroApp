var MODEL_NAME = 'Telefone';
var tableName = 'telefone';

var TipoTelefone = null;

function constructModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: TipoTelefone }
    },
    ddd: {
      type: DataType.INTEGER(2),
      allowNull: false,
      validate: { is: /\d{2}/ }
    },
    numero: {
      type: DataType.INTEGER(9),
      allowNull: false,
      validate: { is: /(\d{8}|\d{9})/ }
    }
  };
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  return Model;
}

module.exports = function (models) {
  TipoTelefone = models.TipoTelefone;

  return { name: MODEL_NAME, constructor: constructModel };
};
