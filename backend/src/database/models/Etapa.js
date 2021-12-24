"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Etapa extends Model {
    static associate(models) {
      this.hasMany(models.Oportunidad, {
        as: "oportunidades",
        foreignKey: { name: "oportunidadId", allowNull: true },
        onDelete: "CASCADE",
      });
    }
  }

  Etapa.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paso: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Etapa",
      tableName: "etapas",
    }
  );
  return Etapa;
};
