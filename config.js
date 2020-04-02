const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  API_KEY_IMG_UPLOAD: process.env.API_KEY_IMG_UPLOAD,
  DATABASE_URL: process.env.DATABASE_URL
}
