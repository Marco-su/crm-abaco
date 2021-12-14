const router = require("express").Router();
const uploader = require("../config/multer");
const {
  crearProducto,
  traerProductos,
  leerProducto,
  modificarProducto,
  eliminarProducto,
  deshabilitarProductos,
} = require("../controllers/producto.controller");

router
  .route("/")
  .get(traerProductos)
  .post(uploader, crearProducto)
  .put(deshabilitarProductos);

router
  .route("/:id")
  .get(leerProducto)
  .put(modificarProducto)
  .delete(eliminarProducto);

module.exports = router;
