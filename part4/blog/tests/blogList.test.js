const listHelper = require('../utils/list_helper')

const emptyBlogs = []
const oneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 300,
    __v: 0
  }
]
const moreBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 200,
    __v: 0
  },
  {
    title: 'Blog Tests R Us',
    author: 'The Real LPizzle',
    url: 'www.getreal.com',
    likes: 600,
    id: '789efg1011',
    __v: 0
  },
  {
    title: 'WFH Habits that KILL',
    author: 'The Real LPizzle',
    url: 'www.getreal.com/wfh-habits-kill',
    likes: 400,
    id: '123abc456',
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = emptyBlogs

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = emptyBlogs

    const result = listHelper.countLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that blog', () => {
    const blogs = oneBlog

    const result = listHelper.countLikes(blogs)
    expect(result).toBe(300)
  })

  test('of a bigger list is sum of likes', () => {
    const blogs = moreBlogs

    const result = listHelper.countLikes(blogs)
    expect(result).toBe(1200)
  })
})

describe('favorite blog', () => {
  test('when empty, returns empty object', () => {
    const blogs = emptyBlogs

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('when one, returns that blog', () => {
    const blogs = oneBlog

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(oneBlog[0])
  })

  test('when many blogs, return blog with highest lights', () => {
    const blogs = moreBlogs

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(moreBlogs[1])
  })
})

describe('most blogs by', () => {
  test('when empty, returns empty object', () => {
    const blogs = emptyBlogs

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({})
  })
  test('when one blog, returns that blogs author ', () => {
    const blogs = oneBlog

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })
  test('when many blogs, returns author with most blogs and how many entries they have', () => {
    const blogs = moreBlogs

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'The Real LPizzle', blogs: 2 })
  })
})

describe('most likes', () => {
  test('when empty, returns empty object', () => {
    const blogs = emptyBlogs

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({})
  })
  test('when one, returns that author and their likes', () => {
    const blogs = oneBlog

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 300 })
  })
  test('when empty, returns empty object', () => {
    const blogs = moreBlogs

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'The Real LPizzle', likes: 1000 })
  })
})
