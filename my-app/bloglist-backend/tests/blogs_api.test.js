const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const userInfo = {
  username: 'Vasisualiy',
  password: 'IputThisEverywhere',
}

const impostorUserInfo = {
  username: 'flash_us',
  password: '3654theRealData2412',
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
}, 100000)

describe('When there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific author is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map((blog) => blog.author)

    expect(authors).toContain('Edsger W. Dijkstra')
  })
})

describe('unique identifier property of the blog posts is named id', () => {
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  }, 100000)
})

describe('Post request tests', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'using useEffect two times',
      author: 'Vasisualiy',
      url: '',
      user: '632e05b622967305927f7e8c',
      comments: [],
    }

    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain('using useEffect two times')
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      likes: 100,
      user: '632e05b622967305927f7e8c',
      comments: [],
    }

    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without specified likes gets 0 likes as default', async () => {
    const newBlog = {
      title: 'Wave-corpuscular theory of female logic',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      user: '632e05b622967305927f7e8c',
      comments: [],
    }

    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogFromDB = await Blog.findOne({ author: 'Vasisualiy' }).exec()

    expect(newBlogFromDB.likes).toBeDefined()
    expect(newBlogFromDB.likes).toBe(0)
  })
})

describe('Delete and put by id', () => {
  test('blogs are deleted by id with delete request', async () => {
    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    await api
      .delete('/api/blogs/5a422aa71b54a676234d17f8')
      .set({ Authorization: `bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const idsAtEnd = blogsAtEnd.map((blog) => blog.id)
    expect(idsAtEnd).not.toContain('5a422aa71b54a676234d17f8')
  })

  test('blogs are updated by id with put request', async () => {
    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    const updatedBlog = {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Wave-corpuscular theory of female logic',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      likes: 12,
      user: '632e05b622967305927f7e8c',
      comments: [
        'cool'
      ],
    }

    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .send(updatedBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const authorsAtEnd = blogsAtEnd.map((blog) => blog.author)
    expect(authorsAtEnd).toContain('Vasisualiy')
  })

  test('blogs are liked by id with put request', async () => {
    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9&like')
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const likedBlogAtEnd = await Blog.findById('5a422b3a1b54a676234d17f9').exec()
    expect(likedBlogAtEnd.likes).toBe(13)
  })

  test('blogs cannot be liked twice by the same user', async () => {
    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9&like')
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9&like')
      .set({ Authorization: `bearer ${token}` })
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const likedBlogAtEnd = await Blog.findById('5a422b3a1b54a676234d17f9').exec()
    expect(likedBlogAtEnd.likes).toBe(13)
  })
}, 10000)

describe('Unauthorized or invalid user blog post put and delete fails with 401', () => {
  test('Unauthorized user cannot add even a valid blog', async () => {
    const newBlog = {
      title: 'using useEffect two times',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      user: '632e05b622967305927f7e8c',
      comments: [],
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs cannot be deleted by user who didnt post it', async () => {
    const newBlog = {
      title: 'Wave-corpuscular theory of female logic',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      user: '632e05b622967305927f7e8c',
      comments: [],
    }

    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const impostorLoginResponse = await api.post('/api/login').send(impostorUserInfo).expect(200)

    const token = loginResponse.body.token
    const impostorToken = impostorLoginResponse.body.token

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    await api
      .delete(`/api/blogs/${postResponse.body.id}`)
      .set({ Authorization: `bearer ${impostorToken}` })
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const idsAtEnd = blogsAtEnd.map((blog) => blog.id)
    expect(idsAtEnd).toContain(postResponse.body.id)
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('blogs cannot be updated by user who didnt post it', async () => {
    const newBlog = {
      title: 'Wave-corpuscular theory of female logic',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      user: '632e05b622967305927f7e8d',
      comments: [],
    }

    const impostorLoginResponse = await api.post('/api/login').send(impostorUserInfo).expect(200)

    const impostorToken = impostorLoginResponse.body.token

    await api
      .put('/api/blogs/5a422bc61b54a676234d17fc') // <--- wasnt posted by impostor
      .send(newBlog) // watch for test_helper.js - initialBlogs
      .set({ Authorization: `bearer ${impostorToken}` })
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const attemptedBlogAtEnd = blogsAtEnd.find((blog) => blog.id === '5a422bc61b54a676234d17fc')
    expect(attemptedBlogAtEnd.title).toBe('Type wars')
    expect(attemptedBlogAtEnd.author).toBe('Robert C. Martin')
  })
})

describe('Cheating requests from frontend and whatever error requests ignored', () => {

  test('all blogs are added with 0 likes, even if some likes are specified in request', async () => {
    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    const newBlog = {
      title: 'Wave-corpuscular theory of female logic',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      likes: 12,
      user: '632e05b622967305927f7e8c',
      comments: [
        'cool'
      ],
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('User cannot update likes number, user info and comments with put request - other updates still work', async () => {
    const loginResponse = await api.post('/api/login').send(userInfo).expect(200)

    const token = loginResponse.body.token

    const updBlog = {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Wave-corpuscular theory of female logic',
      author: 'Vasisualiy',
      url: 'http://mv-mebel.ru/',
      likes: 100500,
      user: '632e05b622967305927f7e8c_abra_cadabra',
      comments: [
        'cool'
      ],
    }

    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .send(updBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const attemptedBlogAtEnd = blogsAtEnd.find((blog) => blog.id === '5a422b3a1b54a676234d17f9')
    expect(attemptedBlogAtEnd.title).toBe('Wave-corpuscular theory of female logic')
    expect(attemptedBlogAtEnd.author).toBe('Vasisualiy')
    expect(attemptedBlogAtEnd.url).toBe('http://mv-mebel.ru/')
    expect(attemptedBlogAtEnd.likes).toBe(12)
    expect(attemptedBlogAtEnd.user.toString()).toBe('632e05b622967305927f7e8c')
    expect(attemptedBlogAtEnd.comments[0]).toBe('cool')
    expect(attemptedBlogAtEnd.comments.length).toBe(1)
  })

})


afterAll(() => {
  mongoose.connection.close()
})
