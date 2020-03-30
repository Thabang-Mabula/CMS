'use strict'
global.__basedir = __dirname

let config = require('./config.js')
let express = require('express')
let path = require('path')
let app = express()
let mainRouter = require('./app/routes/mainRoutes')
app.set('views', path.join(__dirname, './app/views'))
app.use(express.static(path.join(__dirname, './app/public')))
app.use(express.static(path.join(__dirname, './app/controllers')))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

let bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

app.use('/', mainRouter)

let port = process.env.PORT || 3000
app.listen(port)
