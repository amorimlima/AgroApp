const MODEL_NAME = 'TipoTelefone';
const tableName = 'tipo_telefone';

let Telefone = null;

const constructModel = (sequelize, DataType) => {
  const constructor = {
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
  const configs = { tableName };
  const Model = sequelize.define(MODEL_NAME, constructor, configs);

  Model.hasMany(Telefone, { foreignKey: 'tipo' });

  return Model;
}

module.exports = (models) => {
  Telefone = models.Telefone;

  return { name: MODEL_NAME, constructor: constructModel };
};
