const Contacto = require("../database/models/Contacto");

const contactoController = {};

contactoController.traerContactos = (req, res) => {
  Contacto.findAll()
    .then((contactos) => res.json(contactos))
    .catch((err) => res.send(err));
};

contactoController.crearContacto = (req, res) => {};

contactoController.modificarContacto = (req, res) => {};

contactoController.eliminarContacto = (req, res) => {};

module.exports = contactoController;
