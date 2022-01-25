"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CorreoEmpresa extends Model {
    static associate(models) {
      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  CorreoEmpresa.init(
    {
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CorreoEmpresa",
      tableName: "correosEmpresas",
    }
  );
  return CorreoEmpresa;
};
