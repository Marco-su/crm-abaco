"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    static associate(models) {
      // define association here
    }
  }
  Email.init(
    {
      asunto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Email",
    }
  );
  return Email;
};
