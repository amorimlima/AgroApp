function handlingsModel(sequelize, DataTypes) {
  var constructor = {
    id:   { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } },
    icon: { type: DataType.STRING, allowNull: false, validate: { notEmpty: true } }
  };
  var configs = { undescored: true };
  var Handlings = sequelize.define('handlings', constructor, hooks);
}

module.exports = handlingsModel;
