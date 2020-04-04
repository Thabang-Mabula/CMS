'use strict'

const { uploadItem } = require('../models/uploadItems.js')

let express = require('express')
let mainRouter = express.Router()
let app = express()
let path = require('path')
const { retrieveProducts } = require('../models/queries.js')

let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

mainRouter.get('/', function (req, res) {
  res.render('index.ejs', { /* data */ })
  res.status(200)
})

mainRouter.get('/preview/:previewPage', function (req, res) {
  if (req.params.previewPage === 'gallery') {
    retrieveProducts().then((items) => {
      res.render('gallery.ejs', { title: 'Gallery', items })
      res.status(200)
    }).catch((err) => {
      console.log(err)
      res.redirect('/')
      res.status(200)
    })
  }
})

mainRouter.post('/api/uploadItem', function (req, res) {
  uploadItem(req.body.descr, req.body.price, req.body.img).then(() => {
    res.sendStatus(202)
  }).catch(() => {
    res.sendStatus(500)
  })
})

module.exports = mainRouter
