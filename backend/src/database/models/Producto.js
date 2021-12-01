"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    static associate(models) {
      // define association here
    }
  }
  producto.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "producto",
    }
  );
  return producto;
};
