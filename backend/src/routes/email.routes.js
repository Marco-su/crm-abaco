const router = require("express").Router();
const {
  sendEmail,
  buscarDestinatarios,
} = require("../controllers/email.controller");

router.post("/send", sendEmail);
// router.post("/inbox", receiveEmails);
router.post("/destinatarios", buscarDestinatarios);

module.exports = router;
