'use strict'
global.__basedir = __dirname
require('dotenv').config()

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

const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')

// session support is required to use ExpressOIDC
app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false
}))

const oidc = new ExpressOIDC({
  issuer: `https://${process.env.AUTH_DOMAIN}/oauth2/default`,
  client_id: `${process.env.CLIENT_ID_AUTH}`,
  client_secret: `${process.env.CLIENT_SECRET_AUTH}`,
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  appBaseUrl: 'http://localhost:3000',
  scope: 'openid profile'
})

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router)

app.use('/', mainRouter)

let port = process.env.PORT
// app.listen(port)

oidc.on('ready', () => {
  app.listen(3000, () => console.log(`App started`))
})

oidc.on('error', err => {
  console.error('Unable to configure ExpressOIDC', err)
})
