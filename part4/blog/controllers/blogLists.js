const blogListsRouter = require('express').Router()
const BlogList = require('../models/blogList')

blogListsRouter.get('/', async (request, response) => {
  const blogList = await BlogList.find({})
  response.json(blogList)
})

blogListsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request?.body

  if (title && url) {
    const newBlog = new BlogList({
      title: title,
      author: author,
      url: url,
      likes: likes || 0,
    })

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogListsRouter.delete('/:id', async (request, response) => {
  const { id } = request?.params

  await BlogList.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogListsRouter
