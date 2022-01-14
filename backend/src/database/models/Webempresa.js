"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WebEmpresa extends Model {
    static associate(models) {
      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  WebEmpresa.init(
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "otro",
      },
    },
    {
      sequelize,
      modelName: "WebEmpresa",
      tableName: "websEmpresas",
    }
  );
  return WebEmpresa;
};
