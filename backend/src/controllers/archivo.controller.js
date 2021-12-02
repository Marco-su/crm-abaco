const fs = require("fs");
const path = require("path");
const { Archivo } = require("../database");

const archivoController = {};

archivoController.traerArchivos = (req, res) => {
  Archivo.findAll({ include: [{ all: true, nested: true }] })
    .then((archivos) => {
      res.json(archivos);
    })
    .catch((err) => {
      res.send(`Error al cargar archivos: ${err}`);
    });
};

archivoController.crearArchivo = (req, res) => {
  Archivo.create(
    {
      nombre: req.body.nombre,
      storageName: req.files[0].filename,
      tipo: req.files[0].mimetype,
      productoId: 1,
    },
    { include: [{ all: true, nested: true }] }
  )
    .then((producto) => res.json(producto))
    .catch((err) => res.send(`Error al crear producto: ${err}`));
};

archivoController.eliminarArchivo = (req, res) => {
  Archivo.findOne({
    include: [{ all: true, nested: true }],
    where: { id: req.params.id },
  })
    .then((archivo) => {
      fs.unlink(
        path.join(__dirname, `../public/uploads/${archivo.storageName}`),
        (err) => {
          if (err) {
            res.send(`Error al eliminar archivos del producto: ${err}`);
          }
        }
      );
    })
    .then(() => {
      Archivo.destroy({ where: { id: req.params.id } })
        .then((response) => res.json(response))
        .catch((err) => res.send(`Error al eliminar producto: ${err}`));
    })
    .catch((err) => res.send(`Error al eliminar producto: ${err}`));
};

module.exports = archivoController;
