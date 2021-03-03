require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_URI
  : process.env.DB_URI

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  mongodb: {
    URI: MONGODB_URI,
    NAME: process.env.DB_NAME
  }

}

module.exports = {
  config
}
