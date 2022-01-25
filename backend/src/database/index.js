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
db.Role = require("./models/Role")(db.connection, DataTypes);
db.Contacto = require("./models/Contacto")(db.connection, DataTypes);
db.Empresa = require("./models/Empresa")(db.connection, DataTypes);
db.Producto = require("./models/Producto")(db.connection, DataTypes);
db.Archivo = require("./models/Archivo")(db.connection, DataTypes);
db.Telefono = require("./models/Telefono")(db.connection, DataTypes);
db.Oportunidad = require("./models/Oportunidad")(db.connection, DataTypes);
db.Etapa = require("./models/Etapa")(db.connection, DataTypes);
db.Email = require("./models/Email")(db.connection, DataTypes);
db.Direccion = require("./models/Direccion")(db.connection, DataTypes);
db.Permiso = require("./models/Permiso")(db.connection, DataTypes);
db.ClienteCrm = require("./models/Clientecrm")(db.connection, DataTypes);
db.WebEmpresa = require("./models/Webempresa")(db.connection, DataTypes);
db.CorreoEmpresa = require("./models/Correoempresa")(db.connection, DataTypes);
db.TelefonoEmpresa = require("./models/Telefonoempresa")(
  db.connection,
  DataTypes
);

// Asociación de modelos (relaciones)
db.Empresa.associate(db);
db.Contacto.associate(db);
db.Role.associate(db);
db.Empleado.associate(db);
db.Producto.associate(db);
db.Archivo.associate(db);
db.Telefono.associate(db);
db.Oportunidad.associate(db);
db.Etapa.associate(db);
db.Direccion.associate(db);
db.Permiso.associate(db);
db.ClienteCrm.associate(db);
db.WebEmpresa.associate(db);
db.CorreoEmpresa.associate(db);
db.TelefonoEmpresa.associate(db);

module.exports = db;
