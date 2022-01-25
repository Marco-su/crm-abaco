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

      this.hasMany(models.CorreoEmpresa, {
        as: "correos",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasMany(models.TelefonoEmpresa, {
        as: "telefonos",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  Empresa.init(
    {
      idCreacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipoCreacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
      vertical: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      propiedad: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "privada",
      },
      empleados: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      empleadosFuente: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ingresosMinimos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingresosMaximos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ingresosFuente: {
        type: DataTypes.TEXT,
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
        defaultValue: "evaluación",
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
