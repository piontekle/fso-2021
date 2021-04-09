const router = require('express').Router()
const BlogList = require('../models/blogList')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await BlogList.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router