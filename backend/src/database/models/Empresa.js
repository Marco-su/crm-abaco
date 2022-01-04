"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    static associate(models) {
      this.hasMany(models.Contacto, {
        as: "contactos",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasMany(models.Oportunidad, {
        as: "oportunidades",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasOne(models.Telefono, {
        as: "telefono",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
        scope: {
          telefonableType: "empresa",
        },
      });

      this.hasMany(models.Direccion, {
        as: "direcciones",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  Empresa.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vertical: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Prospecto",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "activo",
      },
      web: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      empleados: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      propiedad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ingresos_anuales: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      etapa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nota: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Empresa",
      tableName: "empresas",
    }
  );

  return Empresa;
};
