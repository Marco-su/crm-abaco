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
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(20),
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
