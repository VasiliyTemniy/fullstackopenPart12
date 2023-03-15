const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const mongoUrl = config.MONGODB_URI
logger.info('connecting to', mongoUrl)

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(middleware.requestLogger)

app.use('/login', loginRouter)
app.use('/blogs', blogsRouter)
app.use('/users', usersRouter)

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
