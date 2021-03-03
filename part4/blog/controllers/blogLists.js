const blogListsRouter = require('express').Router()
const BlogList = require('../models/blogList')

blogListsRouter.get('/', async (request, response) => {
  const blogList = await BlogList.find({})
  response.json(blogList)

})

blogListsRouter.post('/', (request, response, next) => {
  const blog = new BlogList(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(err => next(err))
})

module.exports = blogListsRouter
