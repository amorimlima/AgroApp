var MODEL_NAME = 'TipoTelefone';

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

  return TipoTelefone;
}

module.exports = function (models) {
  return { name: MODEL_NAME, constructor: tipoTelefoneModel };
};
