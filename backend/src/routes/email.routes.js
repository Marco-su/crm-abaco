const router = require("express").Router();
const { sendEmail } = require("../controllers/email.controller");

router.post("/send", sendEmail);
// router.post("/inbox", receiveEmails);

module.exports = router;
