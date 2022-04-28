const router = require("express").Router();


router.use(function (req, res, next) {
  res.send('This is the users page!')
  next()
})


module.exports = router
