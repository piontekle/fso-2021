const jwt = require('jsonwebtoken')

const config = require('../utils/config').config
const blogListsRouter = require('express').Router()

const BlogList = require('../models/blogList')
const User = require('../models/user')

blogListsRouter.get('/', async (request, response) => {
  const blogList = await BlogList
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogList)
})

// blogListsRouter.get('/:id', async (request, response) => {
//   const { id } = request?.params
//   const blogList = await BlogList
//     .findById(id)
//     .populate('user', { username: 1, name: 1 })
//   response.json(blogList)
// })

blogListsRouter.post('/', async (request, response) => {
  const { title, author, url, likes, userId } = request?.body
  const { token } = request
  const decodedToken = jwt.verify(token, config.jwtSecret)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(userId)

  if (title && url) {
    const newBlog = new BlogList({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
    })

    const savedBlog = await newBlog.save()
    user.blogLists = user.blogLists.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).json({ error: 'Missing or invalid input' }).end()
  }
})

blogListsRouter.delete('/:id', async (request, response) => {
  const { id } = request?.params

  await BlogList.findByIdAndDelete(id)
  response.status(204).end()
})

blogListsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request?.body
  const { id } = request?.params

  const blog = { title, author, url, likes }

  const updatedBlog = await BlogList.findByIdAndUpdate(id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogListsRouter
