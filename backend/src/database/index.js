const { Sequelize, DataTypes } = require("sequelize");
const database = require("../config/db");

const db = {};

db.connection = new Sequelize(
  database.database,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: database.dialect,
  }
);

// Vinculacion de modelos a base de datos
db.Empleado = require("./models/Empleado")(db.connection, DataTypes);
db.Contacto = require("./models/Contacto")(db.connection, DataTypes);
db.Empresa = require("./models/Empresa")(db.connection, DataTypes);

// Asociación de modelos (relaciones)
db.Empresa.associate(db);
db.Contacto.associate(db);

module.exports = db;
