"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TelefonoEmpresa extends Model {
    static associate(models) {
      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  TelefonoEmpresa.init(
    {
      codPais: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TelefonoEmpresa",
      tableName: "telefonosEmpresa",
    }
  );
  return TelefonoEmpresa;
};
