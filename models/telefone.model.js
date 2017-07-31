module.exports = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  const configs = { tableName: 'telefone' };
  const Model = sequelize.define('Telefone', constructor, configs);

  Model.associate = (models) => {
    Model.belongsTo(models.Usuario);
    Model.belongsTo(models.TipoTelefone, { as: 'Tipo' });
  };

  return Model;
};
