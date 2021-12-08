const router = require("express").Router();
const uploader = require("../config/multer");
const {
  crearProducto,
  traerProductos,
  eliminarProducto,
  modificarProducto,
} = require("../controllers/producto.controller");

router.route("/").get(traerProductos).post(uploader, crearProducto);
router.route("/:id").put(modificarProducto).delete(eliminarProducto);

module.exports = router;
