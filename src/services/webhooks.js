const broker = require("./broker");
const { getDB } = require("../utils/db");
const { ObjectId } = require("mongodb");
const fetchInBatches = require("../utils/fetchInBatches");


const initWebhookService = () => {
    broker.createService({
        name: "webhook",
        actions: {
            register(ctx) {
                let db = getDB();
                return db
                    .collection("webhooks")
                    .insertOne({
                        targetUrl: ctx.params.targetUrl
                    })
                    .then((result) => {
                        return {
                            id: result.insertedId
                        };
                    })
            },
            list(ctx) {
                let db = getDB();
                return db
                    .collection("webhooks")
                    .find({})
                    .toArray()
                    .then((result) => {
                        result = result.map(doc => ({ id: doc["_id"], targetUrl: doc.targetUrl }))
                        return result;
                    })
            },
            update(ctx) {
                let db = getDB();
                let id;
                try {
                    id = new ObjectId(ctx.params.id);
                } catch (error) {
                    return {
                        status: "error",
                        error: `Invalid ID.`
                    }
                }

                return db
                    .collection("webhooks")
                    .updateOne({ _id: id }, {
                        $set: {
                            targetUrl: ctx.params.newTargetUrl
                        }
                    })
                    .then(result => {
                        if (result.matchedCount == 1) {
                            return {
                                status: "OK"
                            }
                        } else {
                            return {
                                status: "error",
                                error: `Webhook not found.`
                            };
                        }
                    })
            },
            delete(ctx) {
                let db = getDB();
                let id;
                try {
                    id = new ObjectId(ctx.params.id);
                } catch (error) {
                    return {
                        status: "error",
                        error: `Invalid ID.`
                    }
                }

                return db
                    .collection("webhooks")
                    .deleteOne({ _id: id })
                    .then(result => {
                        if (result.deletedCount == 1) {
                            return {
                                status: "OK"
                            }
                        } else {
                            return {
                                status: "error",
                                error: `Webhook not found.`
                            }
                        }
                    });

            },
            async trigger(ctx) {
                let db = getDB();

                return targetUrls = db
                    .collection("webhooks")
                    .find({})
                    .toArray()
                    .then(async (result) => {
                        targetUrls = result.map(doc => doc.targetUrl)

                        return fetchInBatches({
                            targetUrls,
                            body: JSON.stringify({ ipAddress: ctx.params.ipAddress }),
                            batchSize: 10
                        })
                            .then(() => {
                                return {
                                    status: "OK"
                                };
                            })
                            .catch((error) => {
                                return {
                                    status: "error",
                                    error: "Something went wrong."
                                };
                            });
                    });
            }
        }
    });
}

module.exports = initWebhookService