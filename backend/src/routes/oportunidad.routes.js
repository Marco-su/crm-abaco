const router = require("express").Router();
const { traerOportunidades } = require("../controllers/oportunidad.controller");

router.route("/").get(traerOportunidades);

module.exports = router;
