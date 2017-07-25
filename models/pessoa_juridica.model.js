const MODEL_NAME = 'PessoaJuridica';
const tableName = 'pessoa_juridica';

const constructModel = (sequelize, DataType) => {
  const constructor = {
    cnpj: {
      type: DataType.BIGINT(16),
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
  const configs = { tableName };

  return sequelize.define(MODEL_NAME, constructor, configs);
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
