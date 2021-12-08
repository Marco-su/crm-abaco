const { Contacto } = require("../database");

const contactoController = {};

contactoController.traerContactos = (req, res) => {
  Contacto.findAll({
    include: [{ all: true, nested: true }],
    where: { status: "activo" },
  })
    .then((contactos) => res.json(contactos))
    .catch((err) => res.send(`Error al cargar contactos: ${err}`));
};

contactoController.crearContacto = (req, res) => {
  Contacto.create(req.body, {
    include: [{ all: true, nested: true }],
  })
    .then((contacto) => res.json(contacto))
    .catch((err) => res.send(`Error al crear contacto: ${err}`));
};

contactoController.leerContacto = (req, res) => {
  Contacto.findOne({
    include: [{ all: true, nested: true }],
    where: { id: req.params.id },
  })
    .then((contacto) => res.json(contacto))
    .catch((err) => res.send(`Error al traer contacto: ${err}`));
};

contactoController.modificarContacto = (req, res) => {
  Contacto.update(req.body, { where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al actualizar contacto: ${err}`));
};

contactoController.eliminarContacto = (req, res) => {
  Contacto.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al eliminar contacto: ${err}`));
};

module.exports = contactoController;
