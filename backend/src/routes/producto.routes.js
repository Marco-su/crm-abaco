const router = require("express").Router();
const uploader = require("../config/multer");
const {
  crearProducto,
  traerProductos,
  eliminarProducto,
} = require("../controllers/producto.controller");

router.route("/").get(traerProductos).post(uploader, crearProducto);
router.route("/:id").delete(eliminarProducto);

module.exports = router;
