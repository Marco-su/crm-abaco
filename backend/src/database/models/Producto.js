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

      this.hasMany(models.Archivo, {
        as: "oportunidades",
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
      codigo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Producto",
    }
  );
  return producto;
};
