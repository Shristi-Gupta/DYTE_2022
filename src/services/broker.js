const { ServiceBroker } = require("moleculer");
const { initWebhookService } = require("./webhooks");

const broker = new ServiceBroker();

module.exports = broker;