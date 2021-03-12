const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogLists', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const { id } = request?.params
  const user = await User
    .findById(id)
    .populate('blogLists', { title: 1, author: 1, url: 1, likes: 1 })

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request?.body

  if (
    !username ||
    !password ||
    username.length < 3 ||
    password.length < 3
  ) {
    response.status(400).json({ error: 'Missing or invalid input' }).end()
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: username,
      name: name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter