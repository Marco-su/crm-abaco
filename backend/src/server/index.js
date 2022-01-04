const cors = require("cors");
const nodemailer = require("nodemailer");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const empleadosRoutes = require("../routes/empleado.routes");
const empresasRoutes = require("../routes/empresa.routes");
const contactosRoutes = require("../routes/contacto.routes");
const productosRoutes = require("../routes/producto.routes");
const archivosRoutes = require("../routes/archivo.routes");
const oportunidadesRoutes = require("../routes/oportunidad.routes");
const authRoutes = require("../routes/auth.routes");
const emailRoutes = require("../routes/email.routes");
const {
  createInitialUser,
  createInitialCrmUser,
} = require("../helpers/initialSetup");

// Inicialización
const app = express();
createInitialUser();
createInitialCrmUser();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);

app.use(express.static(path.join(__dirname, "../public")));

// routes
app.use("/empleados", empleadosRoutes);
app.use("/empresas", empresasRoutes);
app.use("/contactos", contactosRoutes);
app.use("/productos", productosRoutes);
app.use("/archivos", archivosRoutes);
app.use("/oportunidades", oportunidadesRoutes);
app.use("/auth", authRoutes);
app.use("/mail", emailRoutes);

// export
module.exports = app;
