const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helpers')
const User = require('../models/user')

const baseUrl = '/api/users/'

describe('Users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    describe('/POST', () => {
      test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'mluukkai',
          name: 'Matti Luukkainen',
          password: 'salainen',
        }

        await api
          .post(baseUrl)
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
      })

      test('creation fails with proper status code & message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }

        const res = await api
          .post(baseUrl)
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('creation fails with proper status code & if username is less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'ro',
          name: 'Superuser',
          password: 'salainen',
        }

        await api
          .post(baseUrl)
          .send(newUser)
          .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

      test('creation fails with proper status code & if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
          username: 'ro',
          name: 'Superuser',
        }

        await api
          .post(baseUrl)
          .send(newUser)
          .expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})