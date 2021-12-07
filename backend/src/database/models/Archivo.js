"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class archivo extends Model {
    static associate(models) {
      this.belongsTo(models.Producto, {
        as: "producto",
        foreignKey: { name: "productoId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  archivo.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "archivo",
    }
  );
  return archivo;
};
