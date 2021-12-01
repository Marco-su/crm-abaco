"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class archivo extends Model {
    static associate(models) {
      // define association here
    }
  }
  archivo.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      storageName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "archivo",
    }
  );
  return archivo;
};
