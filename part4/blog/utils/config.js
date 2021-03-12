require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_URI
  : process.env.DB_URI

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongodb: {
    uri: MONGODB_URI,
    name: process.env.DB_NAME
  }
}

module.exports = {
  config
}
