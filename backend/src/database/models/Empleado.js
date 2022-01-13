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

      this.hasOne(models.Role, {
        as: "Role",
        foreignKey: { name: "rolableId", allowNull: true },
        constraints: false,
        scope: {
          rolableType: "empleado",
        },
      });

      this.belongsTo(models.ClienteCrm, {
        as: "asociado",
        foreignKey: { name: "asociadoId", allowNull: false },
        onDelete: "CASCADE",
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
      correoEmpresa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dni: {
        type: DataTypes.STRING,
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
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      emailPassword: {
        type: DataTypes.TEXT,
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
