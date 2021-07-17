const broker = require("../services");

let registerWebhook = async (req, res, next) => {
  broker.call("webhook.register", { targetUrl: req.body.targetUrl })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.sendStatus(500);
    })
};

let listWebhook = async (req, res, next) => {
  broker.call("webhook.list", {})
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.sendStatus(500);
    })
};

let updateWebhook = async (req, res, next) => {
  broker.call("webhook.update", { id: req.body.id, newTargetUrl: req.body.newTargetUrl })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.sendStatus(500);
    })
};

let deleteWebhook = async (req, res, next) => {
  broker.call("webhook.delete", { id: req.body.id })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.sendStatus(500);
    })
};

let triggerWebhook = async (req, res, next) => {
  broker.call("webhook.trigger", { ipAddress: req.body.ipAddress })
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.sendStatus(500);
    })
};

module.exports = {
  registerWebhook,
  listWebhook,
  updateWebhook,
  deleteWebhook,
  triggerWebhook
}
