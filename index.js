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

// const session = require('express-session')
var cookieSession = require('cookie-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')

app.use(cookieSession({
  name: 'session',
  secret: process.env.APP_SECRET,
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  secure: false,
  overwrite: true
}))

const oidc = new ExpressOIDC({
  issuer: `https://${process.env.AUTH_DOMAIN}/oauth2/default`,
  client_id: `${process.env.CLIENT_ID_AUTH}`,
  client_secret: `${process.env.CLIENT_SECRET_AUTH}`,
  redirect_uri: `${process.env.BASE_URL}authorization-code/callback`,
  appBaseUrl: `${process.env.BASE_URL}`,
  scope: 'openid profile'
})

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router)
app.all('*', oidc.ensureAuthenticated())

app.use('/', mainRouter)

let port = process.env.PORT
// app.listen(port)

oidc.on('ready', () => {
  app.listen(port, () => console.log(`App started`))
})

oidc.on('error', err => {
  console.error('Unable to configure ExpressOIDC', err)
})
