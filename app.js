const morgan = require("morgan");
const express = require("express");
const { db } = require("./models");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  try {
    res.send("Test string");
  } catch (error) {
    res.send(error);
  }
});

const PORT = 3000;
const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`TESTING PORT ${PORT}`);
  });
};
init();

db.authenticate().then(() => {
  console.log("connected to the database");
});
