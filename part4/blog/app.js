const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const logger = require('./utils/logger')
const config = require('./utils/config').config
const middleware = require('./utils/middleware')

const blogListsRouter = require('./controllers/blogLists')

// Connect to MONGODB
logger.info('Connecting to', config.mongodb.NAME)
mongoose
  .connect(config.mongodb.URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => logger.info('Connected to', config.mongodb.NAME))
  .catch(err => logger.error('Error connecting to DB: ', err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/lists', blogListsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
