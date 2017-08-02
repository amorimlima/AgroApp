module.exports = (sequelize, DataType) => {
  const MODEL_NAME = 'Produto';
  const tableName = 'produto';
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

  Model.associate = (models) => {
    Model.hasMany(models.UsuarioProduto, { foreignKey: 'Produto', as: 'Ofertas' });
  };

  return Model;
};
