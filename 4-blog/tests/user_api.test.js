const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
  {
    name: 'joe',
    username: 'Joe Bloggs',
    passwordHash: '$2b$10$MicySzP2sotp0nvXw5RPMuhvpoEyBHv7cuk87vRX8GE0BzlIVQxHq',
  },
  {
    name: 'jim',
    username: 'Jim Bloggs',
    passwordHash: '$2b$10$YEIEKD2YLLlKvEHmtayhT.Zk8w2zsle0a4zTdI81xIGUBDKWHe4N.',
  }
]

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
    userObject = new User(initialUsers[1])
    await userObject.save()
  })

  test('creating user with no password fails with 400 Bad Request', async () => {
    const badUser = {
      name: 'baddy',
      username: 'A bad user'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('creating user with a password less than 3 characters fails with 400 Bad Request', async () => {
    const badUser = {
      name: 'baddy',
      username: 'A bad user',
      password: 'ab'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('creating user with no username fails with 400 Bad Request', async () => {
    const badUser = {
      name: 'A bad user',
      password: 'apple'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  test('creating user with a username less than 3 characters fails with 400 Bad Request', async () => {
    const badUser = {
      name: 'A bad user',
      username: 'ba',
      password: 'apple'
    }

    await api
      .post('/api/users')
      .send(badUser)
      .expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})