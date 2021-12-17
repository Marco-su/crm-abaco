const { Oportunidad } = require("../database");

const oportunidadController = {};

oportunidadController.traerOportunidades = (req, res) => {
  Oportunidad.findAll({
    include: ["contacto", "empresa", "empleado", "etapa"],
  })
    .then((oportunidades) => res.json(oportunidades))
    .catch((err) => res.send(`Error al cargar oportunidades: ${err}`));
};

module.exports = oportunidadController;
