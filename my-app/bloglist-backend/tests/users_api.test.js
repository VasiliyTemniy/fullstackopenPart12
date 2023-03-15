const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
}, 15000)

describe('User POST request tests', () => {
  test('a valid user can be added ', async () => {
    const newUser = {
      username: 'Ordan',
      name: 'Dmitry Dornichev',
      password: 'iwannabeahero',
      blogs: [],
      likedBlogs: [],
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain('Ordan')
  })

  test('user without username is not added', async () => {
    const newUser = {
      name: 'Dmitry Dornichev',
      password: 'iwannabeahero',
      blogs: [],
      likedBlogs: [],
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain('Username must be longer than 3 symbols')

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('username must be unique, if not - new user is not added', async () => {
    const newUser = {
      username: 'StevieDoesntKnow',
      name: 'Dmitry Dornichev',
      password: 'iwannabeahero',
      blogs: [],
      likedBlogs: [],
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
