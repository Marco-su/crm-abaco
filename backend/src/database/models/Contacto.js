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

      this.hasMany(models.Telefono, {
        as: "telefonos",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
        scope: {
          telefonableType: "contacto",
        },
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
        allowNull: false,
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      web: {
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No contactado",
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
