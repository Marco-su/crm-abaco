const { Op } = require("sequelize");
const { Empresa, Direccion, Contacto } = require("../database");

const empresasController = {};

empresasController.traerEmpresas = (req, res) => {
  Empresa.findAll({
    include: [
      "oportunidades",
      "contactos",
      "direcciones",
      "webs",
      "telefonos",
      "correos",
    ],
    where: { status: "activo" },
    order: [["updatedAt", "DESC"]],
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar empresas: ${err}`));
};

empresasController.traerProspectos = (req, res) => {
  Empresa.findAll({
    include: [
      "oportunidades",
      "contactos",
      "direcciones",
      "webs",
      "telefonos",
      "correos",
    ],
    where: {
      tipo: "Prospecto",
      status: "activo",
    },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar prospectos: ${err}`));
};

empresasController.traerClientes = (req, res) => {
  Empresa.findAll({
    include: [
      "oportunidades",
      "contactos",
      "direcciones",
      "webs",
      "telefonos",
      "correos",
    ],
    where: {
      tipo: "Cliente",
      status: "activo",
    },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar clientes: ${err}`));
};

empresasController.leerEmpresa = (req, res) => {
  Empresa.findOne({
    include: [
      "oportunidades",
      "contactos",
      "direcciones",
      "webs",
      "telefonos",
      "correos",
    ],
    where: { id: req.params.id },
  })
    .then((empresa) => res.json(empresa))
    .catch((err) => res.send(`Error al traer empresa: ${err}`));
};

empresasController.buscarEmpresa = (req, res) => {
  Empresa.findAll({
    limit: 30,
    attributes: ["id", "nombre"],
    where: { nombre: { [Op.like]: `%${req.body.term}%` } },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al traer empresas: ${err}`));
};

empresasController.crearEmpresa = (req, res) => {
  console.log(req.body);

  Empresa.create(
    { ...req.body },
    {
      include: ["contactos", "direcciones", "telefonos"],
    }
  )
    .then((empresa) => res.json(empresa))
    .catch((err) => console.log(`Error al crear empresa: ${err}`));
};

empresasController.modificarEmpresa = (req, res) => {
  Empresa.update(req.body, { where: { id: req.params.id } })
    .then(async (response) => {
      // Actualizando direcciones
      if (req.body.direcciones && req.body.direcciones.length > 0) {
        for (const el of req.body.direcciones) {
          if (el.id) {
            // Si la direcci??n existe
            await Direccion.update(el, { where: { id: el.id } });

            // Si la direccion no existe
          } else {
            await Direccion.create({ ...el, empresaId: req.params.id });
          }
        }
      }

      // Actualizando contactos
      if (req.body.contactos && req.body.contactos.length > 0) {
        for (const el of req.body.contactos) {
          // Si el contacto existe
          if (el.id) {
            await Contacto.update(el, { where: { id: el.id } });

            // Si el contacto no existe
          } else {
            await Contacto.create({ ...el, empresaId: req.params.id });
          }
        }
      }

      res.json(response);
    })
    .catch((err) => res.send(`Error al actualizar Empresa: ${err}`));
};

empresasController.deshabilitarEmpresas = async (req, res) => {
  let success = 0;
  let errors = 0;

  await req.body.ids.forEach((el, i) => {
    Empresa.update({ status: "inactivo" }, { where: { id: el } })
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

empresasController.eliminarEmpresa = (req, res) => {
  Empresa.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al eliminar empresa: ${err}`));
};

module.exports = empresasController;
