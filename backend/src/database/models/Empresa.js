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

      this.hasMany(models.WebEmpresa, {
        as: "webs",
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
      nit: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      representante: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vertical: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      propiedad: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      empleados: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingresos_anuales: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "prospecto",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "activo",
      },
      nota: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      etapa: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "sin evaluar",
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
