module.exports = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: { 
      type: DataType.STRING(200),
      allowNull: false,
      validate: { notEmptY: true }
    },
    diretorio: { 
      type: DataType.STRING(200),
      allowNull: false,
      validate: { notEmptY: true }
    }
  };
  const configs = { tableName: 'documento_cadastro' };

  const Model = sequelize.define('DocumentoCadastro', constructor, configs);

  Model.associate = (models) => {
    Model.belongsTo(models.Usuario);
  }

  return Model;
}
