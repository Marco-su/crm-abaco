const Empresa = require("../database/models/Empresa");

const empresasController = {};

empresasController.traerEmpresas = (req, res) => {
  Empresa.findAll()
    .then((empresas) => res.json(empresas))
    .catch((err) => res.send(err));
};

empresasController.crearEmpresa = (req, res) => {};

empresasController.modificarEmpresa = (req, res) => {};

empresasController.eliminarEmpresa = (req, res) => {};

module.exports = empresasController;
