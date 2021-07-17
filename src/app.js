const dotenv = require("dotenv");

const result = dotenv.config({ path: "./.env" });
if (result.error) {
  throw result.error;
}

const express = require("express");
const routes = require("./routes");
const broker = require("./services");
const {initDB} = require("./utils/db");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

Promise.all([broker.start(), initDB()])
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })

