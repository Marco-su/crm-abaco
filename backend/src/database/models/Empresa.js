"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      // empresa tiene contactos 1:n
      this.hasMany(models.Contacto, {
        as: "contactos",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  Empresa.init(
    {
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      vertical: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Empresa",
    }
  );

  return Empresa;
};
