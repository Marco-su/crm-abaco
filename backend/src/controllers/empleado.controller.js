const { Empleado } = require("../database");

const empleadoController = {};

empleadoController.traerEmpleados = (req, res) => {
  Empleado.findAll({
    include: [{ all: true, nested: true }],
  })
    .then((empleados) => res.json(empleados))
    .catch((err) => res.send(`Error al cargar empleados: ${err}`));
};

empleadoController.crearEmpleado = (req, res) => {
  Empleado.create(req.body, {
    include: [{ all: true, nested: true }],
  })
    .then((empleado) => res.json(empleado))
    .catch((err) => res.send(`Error al crear empleado: ${err}`));
};

empleadoController.leerEmpleado = (req, res) => {
  Empleado.findOne({
    include: [{ all: true, nested: true }],
    where: { id: req.params.id },
  })
    .then((empleado) => res.json(empleado))
    .catch((err) => res.send(`Error al traer empleado: ${err}`));
};

empleadoController.modificarEmpleado = (req, res) => {
  Empleado.update(req.body, { where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al actualizar empleado: ${err}`));
};

empleadoController.eliminiarEmpleado = (req, res) => {
  Empleado.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al eliminar empleado: ${err}`));
};

module.exports = empleadoController;