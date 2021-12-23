const router = require("express").Router();
const {
  traerEmpleados,
  modificarEmpleado,
  eliminiarEmpleado,
  leerEmpleado,
  deshabilitarEmpleados,
} = require("../controllers/empleado.controller");

router.route("/").get(traerEmpleados).put(deshabilitarEmpleados);

router
  .route("/:id")
  .get(leerEmpleado)
  .put(modificarEmpleado)
  .delete(eliminiarEmpleado);

module.exports = router;
