const initWebhookService = require("./webhooks");
const broker = require("./broker");

initWebhookService();
module.exports = broker;