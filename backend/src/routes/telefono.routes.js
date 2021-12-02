const router = require("express").Router();
const {
  traerTelefonosEmp,
} = require("../controllers/telefonoEmpleado.controller");

router.route("/empleados").get(traerTelefonosEmp);

module.exports = router;
