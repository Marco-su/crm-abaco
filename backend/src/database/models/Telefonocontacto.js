"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TelefonoContacto extends Model {
    static associate(models) {
      this.belongsTo(models.Contacto, {
        as: "contacto",
        foreignKey: { name: "contactoId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  TelefonoContacto.init(
    {
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TelefonoContacto",
    }
  );
  return TelefonoContacto;
};
