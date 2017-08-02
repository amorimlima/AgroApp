module.exports = (sequelize, DataType) =>  {
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
  const configs = { tableName: 'categoria_produto' };
  const Model = sequelize.define('CategoriaProduto', constructor, configs);

  Model.associate = (models) => {
    Model.hasMany(models.Produto, { foreignKey: 'Categoria', as: 'Produtos' });
  }

  return Model;
}
