var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_DB_URL;

let db;

const initDB = () => new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, _db) => {
        if (err) reject(err);
        db = _db.db("DYTE");
        console.log("Database created!");
        resolve();
    });
});

const getDB = () => db;

module.exports = {
    initDB, getDB
}
