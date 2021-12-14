const router = require("express").Router();
const {
  traerEmpleados,
  crearEmpleado,
  modificarEmpleado,
  eliminiarEmpleado,
  leerEmpleado,
  deshabilitarEmpleados,
} = require("../controllers/empleado.controller");

router
  .route("/")
  .get(traerEmpleados)
  .put(deshabilitarEmpleados)
  .post(crearEmpleado);

router
  .route("/:id")
  .get(leerEmpleado)
  .put(modificarEmpleado)
  .delete(eliminiarEmpleado);

module.exports = router;
