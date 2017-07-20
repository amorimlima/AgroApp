const MODEL_NAME = 'DocumentoCadastro';
const tableName = 'documento_cadastro';

const constructModel = (sequelize, DataType) => {
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
  const configs = { tableName };

  return sequelize.define(MODEL_NAME, constructor, configs);;
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
