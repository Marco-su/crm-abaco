const router = require("express").Router();
const {
  traerContactos,
  crearContacto,
  leerContacto,
  modificarContacto,
  eliminarContacto,
} = require("../controllers/contacto.controller");

router.route("/").get(traerContactos).post(crearContacto);
router
  .route("/:id")
  .get(leerContacto)
  .put(modificarContacto)
  .delete(eliminarContacto);

module.exports = router;
