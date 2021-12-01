"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contacto extends Model {
    static associate(models) {
      // un contacto pertenece a una empresa n:1
      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  Contacto.init(
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
      modelName: "Contacto",
    }
  );

  return Contacto;
};
