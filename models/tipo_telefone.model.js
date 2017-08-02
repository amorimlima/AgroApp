module.exports = (sequelize, DataType) => {
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
  const configs = { tableName: 'tipo_telefone' };
  const Model = sequelize.define('TipoTelefone', constructor, configs);

  Model.associate = (models) => {
    Model.hasMany(models.Telefone, { foreignKey: 'Tipo', as: 'Telefones' });
  };

  return Model;
}
