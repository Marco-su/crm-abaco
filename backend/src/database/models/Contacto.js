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
        allowNull: false,
      },
      correo: {
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
      modelName: "Contacto",
    }
  );

  return Contacto;
};
