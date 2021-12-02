const router = require("express").Router();
const {
  traerEmpleados,
  crearEmpleado,
  modificarEmpleado,
  eliminiarEmpleado,
  leerEmpleado,
} = require("../controllers/empleado.controller");

router.route("/").get(traerEmpleados).post(crearEmpleado);
router
  .route("/:id")
  .get(leerEmpleado)
  .put(modificarEmpleado)
  .delete(eliminiarEmpleado);

module.exports = router;
