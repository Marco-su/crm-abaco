"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsTo(models.Empleado, {
        as: "empleado",
        foreignKey: { name: "rolableId", allowNull: false },
        constraints: false,
      });

      this.belongsToMany(models.Permiso, {
        through: "permiso_role",
        scope: "permisos",
      });

      this.belongsTo(models.ClienteCrm, {
        as: "asociado",
        foreignKey: { name: "rolableId", allowNull: false },
        constraints: false,
      });
    }
  }
  Role.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rolableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rolableType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
    }
  );
  return Role;
};
