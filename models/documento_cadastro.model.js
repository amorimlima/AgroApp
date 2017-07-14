var MODEL_NAME = 'DocumentoCadastro';
var Pessoa = null;

function documentoCadastroModel(sequelize, DataType) {
  var constructor = {
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
  var configs = { tableName: 'documento_cadastro' };
  var DocumentoCadastro = sequelize.define(MODEL_NAME, constructor, configs);

  return DocumentoCadastro;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;

  return { name: MODEL_NAME, constructor: documentoCadastroModel };
}
