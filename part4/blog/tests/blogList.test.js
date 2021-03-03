const helper = require('./test_helpers')
const listHelper = require('../utils/list_helper')

describe('BlogList', () => {
  test('dummy returns one', () => {
    const blogs = helper.emptyBlogs

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe('total likes', () => {
    test('of empty list is zero', () => {
      const blogs = helper.emptyBlogs

      const result = listHelper.countLikes(blogs)
      expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that blog', () => {
      const blogs = helper.oneBlog

      const result = listHelper.countLikes(blogs)
      expect(result).toBe(300)
    })

    test('of a bigger list is sum of likes', () => {
      const blogs = helper.moreBlogs

      const result = listHelper.countLikes(blogs)
      expect(result).toBe(1200)
    })
  })

  describe('favorite blog', () => {
    test('when empty, returns empty object', () => {
      const blogs = helper.emptyBlogs

      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({})
    })

    test('when one, returns that blog', () => {
      const blogs = helper.oneBlog

      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(helper.oneBlog[0])
    })

    test('when many blogs, return blog with highest lights', () => {
      const blogs = helper.moreBlogs

      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(helper.moreBlogs[1])
    })
  })

  describe('most blogs by', () => {
    test('when empty, returns empty object', () => {
      const blogs = helper.emptyBlogs

      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({})
    })
    test('when one blog, returns that blogs author ', () => {
      const blogs = helper.oneBlog

      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
    })
    test('when many blogs, returns author with most blogs and how many entries they have', () => {
      const blogs = helper.moreBlogs

      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'The Real LPizzle', blogs: 2 })
    })
  })

  describe('most likes', () => {
    test('when empty, returns empty object', () => {
      const blogs = helper.emptyBlogs

      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({})
    })
    test('when one, returns that author and their likes', () => {
      const blogs = helper.oneBlog

      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 300 })
    })
    test('when empty, returns empty object', () => {
      const blogs = helper.moreBlogs

      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'The Real LPizzle', likes: 1000 })
    })
  })
})
