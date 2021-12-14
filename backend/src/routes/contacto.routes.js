const router = require("express").Router();
const {
  traerContactos,
  crearContacto,
  leerContacto,
  modificarContacto,
  eliminarContacto,
  deshabilitarContactos,
} = require("../controllers/contacto.controller");

router
  .route("/")
  .get(traerContactos)
  .put(deshabilitarContactos)
  .post(crearContacto);

router
  .route("/:id")
  .get(leerContacto)
  .put(modificarContacto)
  .delete(eliminarContacto);

module.exports = router;
