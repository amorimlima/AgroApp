const MODEL_NAME = 'UsuarioProduto';
const tableName = 'usuario_produto';

const constructModel = (sequelize, DataType) => {
  const constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unidade: {
      type: DataType.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    quantidade: {
      type: DataType.INTEGER,
      allowNull: false
    },
    data_inicio: {
      type: DataType.DATEONLY,
      allowNull: false,
      validate: { notEmpty: true }
    },
    data_fim: {
      type: DataType.DATEONLY,
      allowNull: false,
      validate: { notEmpty: true }
    },
    ativo: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  };
  const configs = { tableName };
  
  return sequelize.define(MODEL_NAME, constructor, configs);;
}

module.exports = models => ({ name: MODEL_NAME, constructor: constructModel });
