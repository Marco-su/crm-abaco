"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClienteCrm extends Model {
    static associate(models) {
      this.hasMany(models.Empleado, {
        as: "empleados",
        foreignKey: { name: "asociadoId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasMany(models.Role, {
        as: "Roles",
        foreignKey: { name: "rolableId", allowNull: true },
        constraints: false,
        scope: {
          rolableType: "asociado",
        },
      });
    }
  }
  ClienteCrm.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "ClienteCrm",
      tableName: "clientescrm",
    }
  );
  return ClienteCrm;
};
