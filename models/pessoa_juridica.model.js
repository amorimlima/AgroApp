module.exports = (sequelize, DataType) => {
  const constructor = {
    cnpj: {
      type: DataType.STRING(16),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: { is: /\d{14}/ }
    },
    razao_social: {
      type: DataType.STRING(200),
      allowNull: false,
      validate: { notEmpty: true }
    },
    responsavel:  {
      type: DataType.STRING(100),
      allowNull: false,
      validate: { notEmpty: true }
    },
    data_fundacao: {
      type: DataType.DATEONLY,
      allowNull: false
    }
  };
  const configs = { tableName: 'pessoa_juridica' };
  const Model = sequelize.define('PessoaJuridica', constructor, configs);
  
  Model.associate = (models) => {
    Model.belongsTo(models.Usuario);
  };

  return Model;
};
