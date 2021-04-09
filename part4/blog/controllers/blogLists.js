const jwt = require('jsonwebtoken')
const isEmpty = require('lodash/isEmpty')

const { jwtSecret } = require('../utils/config').config
const blogListsRouter = require('express').Router()

const BlogList = require('../models/blogList')
const User = require('../models/user')

const decodeToken = (token) => {
  const decodedToken = jwt.verify(token, jwtSecret)
  if (!token || !decodedToken.id) {
    return null
  }
  return decodedToken.id
}

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
  const { title, author, url, likes } = request?.body
  const { token } = request
  const userId = decodeToken(token)
  if (!userId) {
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
  const { token } = request

  const userId = decodeToken(token)?.toString()
  if (!userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await BlogList.findById(id)
  if (isEmpty(blog)) {
    return response.status(404).json({ error: 'blog not found' })
  } else if (!blog.user || blog.user?.toString() !== userId) {
    return response.status(401).json({ error: 'user does not own this blog' })
  }
  await blog.remove()
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
