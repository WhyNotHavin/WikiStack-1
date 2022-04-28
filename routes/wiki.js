const router = require("express").Router();
const { addPage } = require("../views");
const { main } = require("../views");
const wikipage = require("../views/wikipage");
const { Page } = require("../models");
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

router.get("/", (req, res) => {
  try {
    res.send("Got to GET /wiki/");
  } catch (error) {
    console.error(error);
  }
});
router.get("/add", (req, res) => {
  try {
    res.send(addPage());
  } catch (error) {
    console.error(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });
    res.redirect("/wiki/" + post.slug);
  } catch (error) {
    console.error(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    let current = await Page.findOne({
      where: { slug: req.params.slug },
    });
    current = wikipage(current);
    res.send(current);
  } catch (error) {
    console.log(error);
    next();
  }
});

router.get("/:id", (req, res) => {
  try {
    res.send(main());
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
