const blogListsRouter = require('express').Router()
const BlogList = require('../models/blogList')

blogListsRouter.get('/', async (request, response) => {
  const blogList = await BlogList.find({})
  response.json(blogList)

})

blogListsRouter.post('/', async (request, response) => {
  const { body } = request
  const newBlog = new BlogList({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogListsRouter
