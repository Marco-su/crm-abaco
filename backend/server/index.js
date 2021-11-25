const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const empleadoRoutes = require("../routes/empleado.routes");

// Inicialización
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// routes
app.use("/empleados", empleadoRoutes);

// export
module.exports = app;
