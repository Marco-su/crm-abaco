const { WebEmpresa } = require("../database");

const webEmpresaController = {};

webEmpresaController.createNewWeb = (req, res) => {
  WebEmpresa.create(req.body)
    .then((web) => {
      res.json({
        success: true,
        message: "Empresa creada exitosamente",
        data: web,
      });
    })
    .catch((error) => {
      res.json({
        success: true,
        message: "Error al crear empresa",
        data: error,
      });
    });
};

webEmpresaController.updateWeb = (req, res) => {
  WebEmpresa.update(req.body, { where: { id: req.params.id } })
    .then((web) => {
      res.json({
        success: true,
        message: "Web modificada exitosamente",
        data: web,
      });
    })
    .catch((error) => {
      res.json({
        success: false,
        message: "Error al modificar web",
        data: error,
      });
    });
};

module.exports = webEmpresaController;
