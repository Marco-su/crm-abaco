const Empleado = require("../database/models/Empleado");

const empleadoController = {};

empleadoController.traerEmpleados = (req, res) => {
  Empleado.findAll()
    .then((empleados) => res.json(empleados))
    .catch((err) => res.send(err));
};

empleadoController.crearEmpleado = (req, res) => {};

empleadoController.modificarEmpleado = (req, res) => {};

empleadoController.eliminiarEmpleado = (req, res) => {};

module.exports = empleadoController;
