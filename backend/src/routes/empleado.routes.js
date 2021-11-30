const { Router } = require("express");
const {
  traerEmpleados,
  crearEmpleado,
  modificarEmpleado,
  eliminiarEmpleado,
  leerEmpleado,
} = require("../controllers/empleado.controller");

const router = Router();

router.route("/").get(traerEmpleados).post(crearEmpleado);
router
  .route("/:id")
  .get(leerEmpleado)
  .put(modificarEmpleado)
  .delete(eliminiarEmpleado);

module.exports = router;
