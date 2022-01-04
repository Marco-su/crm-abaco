"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.belongsToMany(models.Empleado, {
        through: "empleado_role",
        scope: "empleados",
      });

      this.belongsToMany(models.Permiso, {
        through: "permiso_role",
        scope: "permisos",
      });

      this.belongsToMany(models.ClienteCrm, {
        through: "clientecrm_role",
        scope: "clientes",
      });
    }
  }
  Role.init(
    {
      nombre: {
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
