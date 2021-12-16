const { Op } = require("sequelize");
const { Empresa } = require("../database");

const empresasController = {};

empresasController.traerEmpresas = (req, res) => {
  Empresa.findAll({
    include: ["oportunidades", "contactos"],
    where: { status: "activo" },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar empresas: ${err}`));
};

empresasController.traerProspectos = (req, res) => {
  Empresa.findAll({
    include: ["oportunidades", "contactos"],
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
    include: ["oportunidades", "contactos"],
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
  Empresa.create(
    { ...req.body, tipo: "prospecto", status: "activo", etapa: "En gestion" },
    {
      include: ["oportunidades", "contactos"],
    }
  )
    .then((empresa) => res.json(empresa))
    .catch((err) => res.send(`Error al crear empresa: ${err}`));
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
