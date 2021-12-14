const router = require("express").Router();
const {
  traerEmpresas,
  traerProspectos,
  traerClientes,
  crearEmpresa,
  modificarEmpresa,
  eliminarEmpresa,
  leerEmpresa,
  deshabilitarEmpresas,
} = require("../controllers/empresa.controller");

router
  .route("/")
  .get(traerEmpresas)
  .put(deshabilitarEmpresas)
  .post(crearEmpresa);

router.get("/prospectos", traerProspectos);
router.get("/clientes", traerClientes);

router
  .route("/:id")
  .get(leerEmpresa)
  .put(modificarEmpresa)
  .delete(eliminarEmpresa);

module.exports = router;
