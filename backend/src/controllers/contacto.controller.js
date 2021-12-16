const { Contacto } = require("../database");

const contactoController = {};

contactoController.traerContactos = (req, res) => {
  Contacto.findAll({
    include: ["telefonos", "empresa", "oportunidades"],
    where: { status: "activo" },
  })
    .then((contactos) => res.json(contactos))
    .catch((err) => res.send(`Error al cargar contactos: ${err}`));
};

contactoController.crearContacto = (req, res) => {
  Contacto.create(
    { ...req.body, status: "activo" },
    {
      include: ["telefonos", "empresa", "oportunidades"],
    }
  )
    .then((contacto) => res.json(contacto))
    .catch((err) => res.send(`Error al crear contacto: ${err}`));
};

contactoController.leerContacto = (req, res) => {
  Contacto.findOne({
    include: ["telefonos", "empresa", "oportunidades"],
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

contactoController.deshabilitarContactos = async (req, res) => {
  let success = 0;
  let errors = 0;

  await req.body.ids.forEach((el, i) => {
    Contacto.update({ status: "inactivo" }, { where: { id: el } })
      .then((response) => success++)
      .catch((err) => errors++)
      .finally(() => {
        if (i === req.body.ids.length - 1) {
          res.json({
            eliminados: success,
            errores: errors,
          });
        }
      });
  });
};

contactoController.eliminarContacto = (req, res) => {
  Contacto.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al eliminar contacto: ${err}`));
};

module.exports = contactoController;
