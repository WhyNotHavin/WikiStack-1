const morgan = require("morgan");
const express = require("express");
const { db } = require("./models");

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:false}))

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);


app.get("/users", (req, res) => {
  res.redirect("/user");
})
app.get("/", (req, res) => {
  res.redirect("/wiki");
})


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
