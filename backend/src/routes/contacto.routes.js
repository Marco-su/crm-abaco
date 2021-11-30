const { Router } = require("express");
const {
  traerContactos,
  crearContacto,
  leerContacto,
  modificarContacto,
  eliminarContacto,
} = require("../controllers/contacto.controller");

const router = Router();

router.route("/").get(traerContactos).post(crearContacto);
router
  .route("/:id")
  .get(leerContacto)
  .put(modificarContacto)
  .delete(eliminarContacto);

module.exports = router;
