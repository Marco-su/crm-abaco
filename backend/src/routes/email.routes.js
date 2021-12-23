const router = require("express").Router();
const { sendEmail, receiveEmails } = require("../controllers/email.controller");

router.post("/send", sendEmail);
router.post("/inbox", receiveEmails);

module.exports = router;
