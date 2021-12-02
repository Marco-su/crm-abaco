const router = require("express").Router();
const {
  traerEmpresas,
  traerProspectos,
  traerClientes,
  crearEmpresa,
  modificarEmpresa,
  eliminarEmpresa,
  leerEmpresa,
} = require("../controllers/empresa.controller");

router.route("/").get(traerEmpresas).post(crearEmpresa);
router.get("/prospectos", traerProspectos);
router.get("/clientes", traerClientes);
router
  .route("/:id")
  .get(leerEmpresa)
  .put(modificarEmpresa)
  .delete(eliminarEmpresa);

module.exports = router;
