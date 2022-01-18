const router = require("express").Router();
const {
  createNewWeb,
  updateWeb,
} = require("../controllers/webempresa.controller");

router.route("/").post(createNewWeb);
router.route("/:id").put(updateWeb);

module.exports = router;
