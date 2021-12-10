"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      this.hasMany(models.Telefono, {
        as: "telefonos",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
        scope: {
          telefonableType: "empleado",
        },
      });

      this.hasMany(models.Contacto, {
        as: "contactos",
        foreignKey: { name: "empleadoId", allowNull: false },
        onDelete: "SET NULL",
      });
    }
  }

  Empleado.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
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
