var MODEL_NAME = 'TipoTelefone';
var tableName = 'tipo_telefone';

var Telefone = null;

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
  var configs = { tableName: tableName };
  var Model = sequelize.define(MODEL_NAME, constructor, configs);

  Model.hasMany(Telefone, { foreignKey: 'tipo' });

  return Model;
}

module.exports = function (models) {
  Telefone = models.Telefone;

  return { name: MODEL_NAME, constructor: constructModel };
};
