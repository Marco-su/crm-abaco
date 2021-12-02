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
db.Producto = require("./models/Producto")(db.connection, DataTypes);
db.Archivo = require("./models/Archivo")(db.connection, DataTypes);
db.TelefonoEmpleado = require("./models/TelefonoEmpleado")(
  db.connection,
  DataTypes
);

// Asociación de modelos (relaciones)
db.Empresa.associate(db);
db.Contacto.associate(db);
db.Empleado.associate(db);
db.Producto.associate(db);
db.Archivo.associate(db);
db.TelefonoEmpleado.associate(db);

module.exports = db;
