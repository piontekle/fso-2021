const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helpers')
const BlogList = require('../models/blogList')

const baseURL = '/api/lists/'

beforeEach(async () => {
  await BlogList.deleteMany({})

  for (let blog of helper.moreBlogs) {
    let blogObj = new BlogList(blog)
    await blogObj.save()
  }
})

describe('BlogLists', () => {
  describe.only('/GET', () => {
    test('blogLists are returned as json', async () => {
      await api
        .get(baseURL)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns the initial blog list', async () => {
      const res = await api.get(baseURL)
      expect(res.status).toBe(200)
      expect(res.body?.length).toBe(3)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})