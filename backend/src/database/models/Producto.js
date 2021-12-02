"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    static associate(models) {
      this.hasMany(models.Archivo, {
        as: "archivos",
        foreignKey: { name: "productoId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }
  producto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "producto",
    }
  );
  return producto;
};
