const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Empleado extends Model {}

Empleado.init(
  {
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
  },
  { sequelize, modelName: "empleado" }
);

module.exports = Empleado;
