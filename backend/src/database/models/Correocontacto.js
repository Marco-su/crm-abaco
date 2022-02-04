"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CorreoContacto extends Model {
    static associate(models) {
      this.belongsTo(models.Contacto, {
        as: "contacto",
        foreignKey: { name: "contactoId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  CorreoContacto.init(
    {
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CorreoContacto",
      tableName: "correosContactos",
    }
  );
  return CorreoContacto;
};
