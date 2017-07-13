var MODEL_NAME = 'PessoaProduto';
var Pessoa = null;
var Produto = null;

function pessoaProdutoModel(sequelize, DataType) {
  var constructor = {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pessoa: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: Pessoa }
    },
    produto: {
      type: DataType.INTEGER,
      allowNull: false,
      references: { model: Produto }
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
      type: DataType.DATE,
      allowNull: false,
      validate: { notEmpty: true }
    },
    data_fim: {
      type: DataType.DATE,
      allowNull: false,
      validate: { notEmpty: true }
    },
    ativo: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  };
  var configs = { tableName: 'pessoa_produto' };
  var PessoaProduto = sequelize.define(MODEL_NAME, constructor, configs);

  return PessoaProduto;
}

module.exports = function (models) {
  Pessoa = models.Pessoa;
  Produto = models.Produto;

  return { name: MODEL_NAME, constructor: pessoaProdutoModel };
};
