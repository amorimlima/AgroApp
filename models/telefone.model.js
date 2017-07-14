var MODEL_NAME = 'Telefone';
var Pessoa = null;
var TipoTelefone = null;

function telefoneModel(sequelize, DataType) {
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
  var configs = { tableName: 'telefone' };
  var Telefone = sequelize.define(MODEL_NAME, constructor, configs);

  return Telefone;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;
  TipoTelefone = models.TipoTelefone;


  return { name: MODEL_NAME, constructor: telefoneModel };
};
