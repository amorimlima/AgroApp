var MODEL_NAME = 'TipoTelefone';
var Telefone = null;

function tipoTelefoneModel(sequelize, DataType) {
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
  var configs = { tableName: 'tipo_telefone' };
  var TipoTelefone = sequelize.define(MODEL_NAME, constructor, configs);

  TipoTelefone.hasMany(Telefone, { foreignKey: 'tipo' });

  return TipoTelefone;
}

module.exports = function (models) {
  Telefone = models.Telefone;

  return { name: MODEL_NAME, constructor: tipoTelefoneModel };
};
