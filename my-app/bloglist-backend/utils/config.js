/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI =
  process.env.NODE_ENV === 'development' ? process.env.DEV_MONGO_URL : process.env.MONGODB_URI

const SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
}
