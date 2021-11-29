const { Router } = require("express");
const {
  traerEmpresas,
  crearEmpresa,
  modificarEmpresa,
  eliminarEmpresa,
} = require("../controllers/empresa.controller");

const router = Router();

router.route("/").get(traerEmpresas).post(crearEmpresa);
router.route("/:id").get(modificarEmpresa).post(eliminarEmpresa);

module.exports = router;
