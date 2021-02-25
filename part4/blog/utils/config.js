require('dotenv').config()

const config = {
  PORT: process.env.PORT || 3001,
  mongodb: {
    URI: process.env.DB_URI,
    NAME: process.env.DB_NAME
  }

}

module.exports = {
  config
}
