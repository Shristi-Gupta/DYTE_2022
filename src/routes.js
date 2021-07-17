const express = require("express");
const webhooksController = require("./controllers/webhooks");
var router = express.Router();

router.post("/register", webhooksController.registerWebhook);
router.get("/list", webhooksController.listWebhook);
router.put("/update", webhooksController.updateWebhook);
router.delete("/delete", webhooksController.deleteWebhook);

router.get("/trigger", webhooksController.triggerWebhook);

module.exports = router;
