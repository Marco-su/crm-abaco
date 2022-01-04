"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permiso extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: "permiso_role",
        scope: "roles",
      });
    }
  }
  Permiso.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Permiso",
      tableName: "permisos",
    }
  );
  return Permiso;
};
