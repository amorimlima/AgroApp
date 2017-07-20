const MODEL_NAME = 'Produto';
const tableName = 'produto';

let UsuarioProduto = null;

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
  const options = { tableName };
  const Model = sequelize.define(MODEL_NAME, constructor, options);

  Model.hasMany(UsuarioProduto, { foreignKey: tableName });

  return Model;
}

module.exports = (models) => {
  UsuarioProduto = models.UsuarioProduto;

  return { name: MODEL_NAME, constructor: constructModel };
};
