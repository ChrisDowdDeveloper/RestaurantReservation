const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");
const express = require("express"); 
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
