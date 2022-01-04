const { Empleado, Telefono } = require("../database");

const empleadoController = {};

empleadoController.traerEmpleados = async (req, res) => {
  Empleado.findAll({
    include: ["telefonos", "contactos", "oportunidades"],
    where: { status: "activo" },
    attributes: { exclude: ["password", "emailPassword"] },
  })
    .then((empleados) => res.json(empleados))
    .catch((err) => res.send(`Error al cargar empleados: ${err}`));
};

empleadoController.leerEmpleado = (req, res) => {
  Empleado.findOne({
    include: ["telefonos", "contactos", "oportunidades"],
    where: { id: req.params.id },
    attributes: { exclude: ["password", "emailPassword"] },
  })
    .then((empleado) => res.json(empleado))
    .catch((err) => res.send(`Error al traer empleado: ${err}`));
};

empleadoController.modificarEmpleado = (req, res) => {
  Empleado.update(req.body, {
    where: { id: req.params.id },
  })
    .then((response) => {
      if (
        req.body.telefonos &&
        req.body.telefonos.length > 0 &&
        req.body.telefonos[0].id
      ) {
        req.body.telefonos.forEach((el, index, array) => {
          Telefono.update(el, { where: { id: el.id } });

          if (index === array.length - 1) {
            res.json(response);
          }
        });
      }

      if (
        req.body.telefonos &&
        req.body.telefonos.length > 0 &&
        !req.body.telefonos[0].id
      ) {
        req.body.telefonos.forEach((el, index, array) => {
          Telefono.create({
            ...el,
            telefonableType: "empleado",
            telefonableId: req.params.id,
          });

          if (index === array.length - 1) {
            res.json(response);
          }
        });
      }
    })
    .catch((err) => res.send(`Error al actualizar empleado: ${err}`));
};

empleadoController.deshabilitarEmpleados = async (req, res) => {
  let success = 0;
  let errors = 0;

  await req.body.ids.forEach((el, i) => {
    Empleado.update({ status: "inactivo" }, { where: { id: el } })
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

empleadoController.eliminiarEmpleado = (req, res) => {
  Empleado.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al eliminar empleado: ${err}`));
};

module.exports = empleadoController;
