const { Empresa } = require("../database");

const empresasController = {};

empresasController.traerEmpresas = (req, res) => {
  Empresa.findAll({
    include: [{ all: true, nested: true }],
    where: { status: "activo" },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar empresas: ${err}`));
};

empresasController.traerProspectos = (req, res) => {
  Empresa.findAll({
    include: [{ all: true, nested: true }],
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
    include: [{ all: true, nested: true }],
    where: {
      tipo: "Cliente",
      status: "activo",
    },
  })
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(`Error al cargar clientes: ${err}`));
};

empresasController.crearEmpresa = (req, res) => {
  Empresa.create(req.body, {
    include: [{ all: true, nested: true }],
  })
    .then((empresa) => res.json(empresa))
    .catch((err) => res.send(`Error al crear empresa: ${err}`));
};

empresasController.leerEmpresa = (req, res) => {
  Empresa.findOne({
    include: [{ all: true, nested: true }],
    where: { id: req.params.id },
  })
    .then((empresa) => res.json(empresa))
    .catch((err) => res.send(`Error al traer empresa: ${err}`));
};

empresasController.modificarEmpresa = (req, res) => {
  Empresa.update(req.body, { where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al actualizar empresa: ${err}`));
};

empresasController.eliminarEmpresa = (req, res) => {
  Empresa.destroy({ where: { id: req.params.id } })
    .then((response) => res.json(response))
    .catch((err) => res.send(`Error al eliminar empresa: ${err}`));
};

module.exports = empresasController;
