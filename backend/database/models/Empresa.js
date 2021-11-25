const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Empresa extends Model {}

Empresa.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vertical: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  { sequelize, modelName: "empresa" }
);

module.exports = Empresa;
