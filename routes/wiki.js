const router = require("express").Router();
const {addPage} = require('../views')
const {main} = require('../views')
const {wikipage} = require('../views')
const {Page} = require("../models")
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  next()
})



router.get('/', (req,res) =>{
  try {
    res.send('Got to GET /wiki/')
  } catch (error) {
    console.error(error)
  }

})
router.get('/add', (req,res) =>{
  try {
    res.send(addPage())
  } catch (error) {
    console.error(error)
  }
})


router.post('/', async (req,res) =>{
  try {
      await Page.create({
        title: req.body.title,
        content: req.body.content
      })
      res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})


router.get('/:id', (req,res) =>{
  try {
    res.send(main())
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
