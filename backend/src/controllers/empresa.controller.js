const { Op } = require("sequelize");
const { Empresa } = require("../database");

const empresasController = {};

empresasController.traerEmpresas = (req, res) => {
  Empresa.findAll({
    include: ["oportunidades", "contactos", "direcciones"],
    where: { status: "activo" },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar empresas: ${err}`));
};

empresasController.traerProspectos = (req, res) => {
  Empresa.findAll({
    include: ["oportunidades", "contactos", "direcciones"],
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
    include: ["oportunidades", "contactos", "direcciones"],
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
    include: ["oportunidades", "contactos"],
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
      include: ["contactos", "direcciones"],
    }
  )
    .then((empresa) => res.json(empresa))
    .catch((err) => console.log(`Error al crear empresa: ${err}`));
};

empresasController.creacionMasiva = (req, res) => {
  let success = 0;
  let errors = 0;

  req.body.forEach((el, index) => {
    Empresa.create(el, {
      include: ["telefono", "direcciones", "contactos"],
    })
      .then(() => {
        success = success + 1;
      })
      .catch(() => {
        errors = errors + 1;
      })
      .finally(() => {
        if (index === req.body.length - 1) {
          res.json({ created: success, errors: errors });
        }
      });
  });
};

empresasController.modificarEmpresa = (req, res) => {
  Empresa.update(req.body, { where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al actualizar empresa: ${err}`));
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
