"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Contacto extends Model {
    static associate(models) {
      // un contacto pertenece a una empresa n:1
      this.belongsTo(models.Empresa, {
        as: "empresa",
        foreignKey: { name: "empresaId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Empleado, {
        as: "empleado",
        foreignKey: { name: "empleadoId", allowNull: true },
        onDelete: "SET NULL",
      });

      this.hasMany(models.CorreoContacto, {
        as: "correos",
        foreignKey: { name: "contactoId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasMany(models.TelefonoContacto, {
        as: "telefonos",
        foreignKey: { name: "contactoId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.hasMany(models.Oportunidad, {
        as: "oportunidades",
        foreignKey: { name: "contactoId", allowNull: false },
        onDelete: "CASCADE",
      });
    }
  }

  Contacto.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      empleados: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      origen: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Marketing",
      },
      linkedin: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      facebook: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      instagram: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      twitter: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No contactado",
      },
      imgStorageName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Contacto",
      tableName: "contactos",
    }
  );

  return Contacto;
};
