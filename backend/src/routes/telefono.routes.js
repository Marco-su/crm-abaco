const { Router } = require("express");
const {
  traerTelefonosEmp,
} = require("../controllers/telefonoEmpleado.controller");

const router = Router();

router.route("/empleados").get(traerTelefonosEmp);

module.exports = router;
