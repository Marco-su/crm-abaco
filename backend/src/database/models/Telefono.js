"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class telefono extends Model {
    static associate(models) {
      this.belongsTo(models.Empleado, {
        as: "empleado",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
      });

      this.belongsTo(models.Contacto, {
        as: "contacto",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
      });

      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
      });
    }
  }

  telefono.init(
    {
      codPais: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefonableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      telefonableType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Telefono",
      tableName: "telefonos",
    }
  );

  return telefono;
};
