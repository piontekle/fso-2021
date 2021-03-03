const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helpers')
const BlogList = require('../models/blogList')

const baseUrl = '/api/lists/'

beforeEach(async () => {
  await BlogList.deleteMany({})

  for (let blog of helper.moreBlogs) {
    let blogObj = new BlogList(blog)
    await blogObj.save()
  }
})

describe('BlogLists', () => {
  describe('/GET', () => {
    test('blogLists are returned as json', async () => {
      await api
        .get(baseUrl)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns the initial blog list', async () => {
      const res = await api.get(baseUrl)
      expect(res.status).toBe(200)
      expect(res.body?.length).toBe(helper.moreBlogs.length)
    })

    test('unique identifier is named id', async () => {
      const res = await api.get(baseUrl)
      expect(res.status).toBe(200)
      expect(res.body?.[0].id).toBeDefined()
      expect(res.body?.[0]._id).not.toBeDefined()
    })
  })

  describe('/POST', () => {
    test('a new blog is added to the list', async () => {
      const newBlog = {
        title: 'Programming is Good For the Soul',
        author: 'The Fake PLizzle',
        url: 'www.getfake.com/programming-good-soul',
        likes: 321,
      }

      const res = await api.post(baseUrl).send(newBlog)
      expect(res.status).toBe(201)
      expect(res.body?.title).toBe('Programming is Good For the Soul')

      const newList = await helper.blogsInDb()
      expect(newList.length).toEqual(helper.moreBlogs.length + 1)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})