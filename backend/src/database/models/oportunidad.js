"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Oportunidad extends Model {
    static associate(models) {
      this.belongsTo(models.Etapa, {
        as: "etapa",
        foreignKey: { name: "oportunidadId", allowNull: false },
        onDelete: "CASCADE",
      });

      this.belongsTo(models.Contacto, {
        as: "contacto",
        foreignKey: { name: "contactoId", allowNull: false },
        onDelete: "CASCADE",
      });

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

      this.belongsTo(models.Producto, {
        as: "producto",
        foreignKey: { name: "productoId", allowNull: true },
        onDelete: "SET NULL",
      });
    }
  }

  Oportunidad.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Oportunidad",
      tableName: "oportunidades",
    }
  );
  return Oportunidad;
};
