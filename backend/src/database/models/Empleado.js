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
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "$2a$10$07qvuOYAvA.KKZeK4F2UsOQcztQZy/KHp.2PlUqWaPdpfGReitWR.",
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
