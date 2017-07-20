const MODEL_NAME = 'CategoriaProduto';
const tableName = 'categoria_produto';
let Produto = null;

const constructModel = (sequelize, DataType) =>  {
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
  const CategoriaProduto = sequelize.define(MODEL_NAME, constructor, configs);

  CategoriaProduto.hasMany(Produto, { foreignKey: 'categoria' });

  return CategoriaProduto;
}

module.exports = (models) => {
  Produto = models.Produto;

  return { name: MODEL_NAME, constructor: constructModel };
};
