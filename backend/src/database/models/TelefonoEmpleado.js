"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TelefonoEmpleado extends Model {
    static associate(models) {
      this.belongsTo(models.Empleado, {
        as: "empleado",
        foreignKey: { name: "empleadoId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  TelefonoEmpleado.init(
    {
      codPais: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TelefonoEmpleado",
    }
  );

  return TelefonoEmpleado;
};
