"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      this.hasMany(models.TelefonoEmpleado, {
        as: "telefonos",
        foreignKey: { name: "empleadoId", allowNull: false },
        onDelete: "CASCADE",
      });
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
      correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Empleado",
    }
  );
  return Empleado;
};