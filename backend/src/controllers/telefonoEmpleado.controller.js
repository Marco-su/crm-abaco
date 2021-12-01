const { TelefonoEmpleado } = require("../database");

const telefonoEmpController = {};

telefonoEmpController.traerTelefonosEmp = (req, res) => {
  TelefonoEmpleado.findAll({
    include: [{ all: true, nested: true }],
  })
    .then((telefonos) => res.json(telefonos))
    .catch((err) => res.send(`Error al cargar telefonos: ${err}`));
};

module.exports = telefonoEmpController;
