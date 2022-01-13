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
  buscarEmpresa,
  creacionMasiva,
} = require("../controllers/empresa.controller");

router
  .route("/")
  .get(traerEmpresas)
  .put(deshabilitarEmpresas)
  .post(crearEmpresa);

router.get("/prospectos", traerProspectos);
router.post("/prospectos", creacionMasiva);
router.get("/clientes", traerClientes);
router.post("/search", buscarEmpresa);

router
  .route("/:id")
  .get(leerEmpresa)
  .put(modificarEmpresa)
  .delete(eliminarEmpresa);

module.exports = router;
