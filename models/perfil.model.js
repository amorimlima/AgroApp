const MODEL_NAME = 'Perfil';
const tableName = 'perfil';

let Credencial = null;

const constructModel = (sequelize, DataType) => {
  const constructor = {
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
  const configs = { tableName };
  const Model  = sequelize.define(MODEL_NAME, constructor, configs);

  Model.hasMany(Credencial, { foreignKey: tableName });
  
  return Model;
};

module.exports = (models) => {
  Credencial = models.Credencial;

  return { name: MODEL_NAME, constructor: constructModel };
};
