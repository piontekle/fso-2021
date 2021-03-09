const BlogList = require('../models/blogList')
const User = require('../models/User')


// BlogList Helpers --------------------------------------
const emptyBlogs = []
const oneBlog = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 300,
  }
]
const moreBlogs = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 200,
  },
  {
    title: 'Blog Tests R Us',
    author: 'The Real LPizzle',
    url: 'www.getreal.com',
    likes: 600,
    id: '789efg1011',
  },
  {
    title: 'WFH Habits that KILL',
    author: 'The Real LPizzle',
    url: 'www.getreal.com/wfh-habits-kill',
    likes: 400,
    id: '123abc456',
  }
]

const blogsInDb = async () => {
  const blogList = await BlogList.find({})
  return blogList
}

const getABlogId = async () => {
  const blogList = await blogsInDb()
  return blogList[0].id
}

// User Helpers --------------------------------------

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  emptyBlogs,
  oneBlog,
  moreBlogs,
  blogsInDb,
  getABlogId,
  usersInDb,
}