"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Direccion extends Model {
    static associate(models) {
      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  Direccion.init(
    {
      calle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      codigoPostal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "facturacion",
      },
    },
    {
      sequelize,
      modelName: "Direccion",
      tableName: "direcciones",
    }
  );
  return Direccion;
};
