var MODEL_NAME = 'Perfil';
var tableName = 'perfil';

var Credencial = null;

function constructModel(sequelize, DataType) {
  var constructor = {
    id:   {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataType.STRING(45),
      allowNull: false,
      validate: { notEmpty: true }
    }

  };
  var configs = { tableName: tableName };
  var Model  = sequelize.define(MODEL_NAME, constructor, configs);

  Model.hasMany(Credencial, { foreignKey: tableName });
  
  return Model;
};

module.exports = function (models) {
  Credencial = models.Credencial;

  return { name: MODEL_NAME, constructor: constructModel };
};
