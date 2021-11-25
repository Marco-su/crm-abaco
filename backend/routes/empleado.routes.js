const { Router } = require("express");
const {
  traerEmpleados,
  crearEmpleado,
  modificarEmpleado,
  eliminiarEmpleado,
} = require("../controllers/empleado.controller");

const router = Router();

router.route("/").get(traerEmpleados).post(crearEmpleado);
router.route("/:id").put(modificarEmpleado).delete(eliminiarEmpleado);

module.exports = router;
