"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Empleado extends Model {
    static associate(models) {
      this.hasMany(models.Telefono, {
        as: "telefonos",
        foreignKey: { name: "telefonableId", allowNull: false },
        constraints: false,
        scope: {
          telefonableType: "empleado",
        },
      });

      this.hasMany(models.Contacto, {
        as: "contactos",
        foreignKey: { name: "empleadoId", allowNull: true },
        onDelete: "SET NULL",
      });

      this.hasMany(models.Oportunidad, {
        as: "oportunidades",
        foreignKey: { name: "empleadoId", allowNull: true },
        onDelete: "SET NULL",
      });

      this.belongsToMany(models.Role, {
        through: "empleado_role",
        scope: "roles",
      });
    }
  }

  Empleado.init(
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
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      web: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      empleados: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "activo",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailFirma: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      emailPassword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Empleado",
      tableName: "empleados",
    }
  );

  return Empleado;
};
