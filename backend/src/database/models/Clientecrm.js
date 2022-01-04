"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClienteCrm extends Model {
    static associate(models) {
      this.belongsToMany(models.Role, {
        through: "clientecrm_role",
        scope: "roles",
      });
    }
  }
  ClienteCrm.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ClienteCrm",
      tableName: "clientescrm",
    }
  );
  return ClienteCrm;
};
