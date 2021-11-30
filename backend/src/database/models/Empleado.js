"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      // define association here
    }
  }
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
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Empleado",
      underscored: true,
    }
  );
  return Empleado;
};
