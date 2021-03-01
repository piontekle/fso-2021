const logger = require('../utils/logger')
const config = require('../utils/config').config

const blogListsRouter = require('express').Router()
const BlogList = require('../models/blogList')

blogListsRouter.get('/', (request, response, next) => {
  BlogList
    .find({})
    .then(blogList => {
      response.json(blogList)
    })
    .catch(err => next(err))
})

blogListsRouter.post('/', (request, response) => {
  const blog = new BlogList(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})

module.exports = blogListsRouter
