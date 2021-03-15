const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')

const baseUrl = '/api/login/'

describe('LOGIN', () => {
  beforeEach( async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('logs in with correct credentials', async () => {
    const user = { username: 'root', password: 'sekret' }

    const res = await api.post(baseUrl).send(user).expect(200)
    expect(res.body.token).not.toBe(undefined)
  })

  test('rejects if credentials are wrong', async () => {
    const user = { username: 'root', password: 'secret' }

    const res = await api.post(baseUrl).send(user).expect(401)
    expect(res.body.error).toBe('invalid username or password')
  })
})

afterAll(() => {
  mongoose.connection.close()
})