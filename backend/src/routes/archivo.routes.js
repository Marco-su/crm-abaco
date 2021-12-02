const router = require("express").Router();
const uploader = require("../config/multer");
const {
  traerArchivos,
  crearArchivo,
  eliminarArchivo,
} = require("../controllers/archivo.controller");

router.route("/").get(traerArchivos).post(uploader, crearArchivo);
router.route("/:id").delete(eliminarArchivo);

module.exports = router;
