const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

// Skipped 4.22 making the tests past

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Dennis Rodman',
    url: 'http://reddit.com',
    likes: 5
  },
  {
    title: '2 YOLO or not 2 YOLO',
    author: 'Batman',
    url: 'http://buttman.com',
    likes: 7
  },
]

const token = null

describe('blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('ids are named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('adding a new blog works', async () => {
    const newBlog = {
      title: 'My new blog',
      author: 'Spiderman',
      url: 'http://gasgasgas.com',
      likes: 32
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(
      'My new blog'
    )
  })

  test('new blogs without likes specified default to 0', async () => {
    const newBlog = {
      title: 'Default Zero',
      author: 'Zeroman',
      url: 'http://zeroweb.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const response = await api.get('/api/blogs')
    const blog = response.body.find(b => b.title === 'Default Zero')
    expect(blog.likes).toEqual(0)
  })

  test('malformed blog creation fails with 400 Bad Request', async () => {
    const badBlog = {
      url: 'http://gasgasgas.com',
      likes: 32
    }

    await api
      .post('/api/blogs')
      .send(badBlog)
      .expect(400)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})