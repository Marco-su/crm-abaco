const { Model, DataTypes } = require("sequelize");
const sequelize = require("../index");

class Contacto extends Model {}

Contacto.init(
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
  { sequelize, modelName: "contacto" }
);

module.exports = Contacto;
