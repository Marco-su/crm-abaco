const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const empleadosRoutes = require("../routes/empleado.routes");
const empresasRoutes = require("../routes/empresa.routes");
const contactosRoutes = require("../routes/contacto.routes");
const telefonoRoutes = require("../routes/telefono.routes");

// Inicialización
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);

// routes
app.use("/empleados", empleadosRoutes);
app.use("/empresas", empresasRoutes);
app.use("/contactos", contactosRoutes);
app.use("/telefonos", telefonoRoutes);

// export
module.exports = app;
