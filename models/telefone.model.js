module.exports = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ddd: {
      type: DataType.STRING(2),
      allowNull: false,
      validate: { is: /\d{2}/ }
    },
    numero: {
      type: DataType.STRING(9),
      allowNull: false,
      validate: { is: /(\d{8}|\d{9})/ }
    }
  };
  const configs = { tableName: 'telefone' };
  const Model = sequelize.define('Telefone', constructor, configs);

  return Model;
};
