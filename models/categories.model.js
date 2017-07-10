function categoriesModel(sequelize, DataType) {
  var constructor = {
    id:   { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
    icon: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { undescored: true };
  var Categories = sequelize.define('categories', constructor, configs);
}

module.exports = categoriesModel;
