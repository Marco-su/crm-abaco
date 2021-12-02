const fs = require("fs");
const path = require("path");
const { Producto } = require("../database");

const productoController = {};

productoController.traerProductos = (req, res) => {
  Producto.findAll({
    include: [{ all: true, nested: true }],
  })
    .then((productos) => res.json(productos))
    .catch((err) => res.send(`Error al cargar productos: ${err}`));
};

productoController.crearProducto = (req, res) => {
  const nombre = req.body.nombre;
  const archivos = [];

  req.files.forEach((el) => {
    const nombre = el.originalname
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\.[^/.]+$/, "")
      .slice(0, 150);

    archivos.push({ nombre, storageName: el.filename, tipo: el.mimetype });
  });

  Producto.create(
    { nombre, archivos },
    { include: [{ all: true, nested: true }] }
  )
    .then((producto) => res.json(producto))
    .catch((err) => res.send(`Error al crear producto: ${err}`));
};

productoController.eliminarProducto = (req, res) => {
  Producto.findOne({
    include: [{ all: true, nested: true }],
    where: { id: req.params.id },
  })
    .then((producto) => {
      producto.archivos.forEach((el) => {
        fs.unlink(
          path.join(__dirname, `../public/uploads/${el.storageName}`),
          (err) => {
            if (err) {
              res.send(`Error al eliminar archivos del producto: ${err}`);
            }
          }
        );
      });
    })
    .then(() => {
      Producto.destroy({ where: { id: req.params.id } })
        .then((response) => res.json(response))
        .catch((err) => res.send(`Error al eliminar producto: ${err}`));
    })
    .catch((err) => res.send(`Error al eliminar producto: ${err}`));
};

module.exports = productoController;