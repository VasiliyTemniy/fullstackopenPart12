const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.post(
  '/',
  middleware.verifyToken,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: request.user._id,
      comments: [],
    })

    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
  },
)

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).exec()

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).exec()

  response.json(blog)
})

blogsRouter.delete(
  '/:id',
  middleware.verifyToken,
  middleware.userExtractor,
  async (request, response) => {
    let user = request.user
    const indexToDelete = user.blogs.indexOf(request.params.id)
    if (indexToDelete === -1) {
      response.status(403).json({ error: "attempt to delete another user's blog" })
    } else {
      user.blogs.splice(indexToDelete, 1)

      const { username, name, passwordHash, blogs } = user

      await User.findByIdAndUpdate(
        request.user.id,
        { username, name, passwordHash, blogs },
        { new: true, runValidators: true, context: 'query' },
      )

      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  },
)

blogsRouter.put(
  '/:id&like',
  middleware.verifyToken,
  middleware.userExtractor,
  async (request, response) => {

    const wasLiked = request.user.likedBlogs.indexOf(request.params.id) === -1 ? false : true
    if (wasLiked) {
      return response.status(403).json({ error: "attempt to like a blog twice" })
    } else {
      const blog = await Blog.findById(request.params.id, 'likes').exec()
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { likes: blog.likes +1 },
        { new: true, runValidators: true, context: 'query' },
      )

      request.user.likedBlogs = request.user.likedBlogs.concat(updatedBlog._id)
      await request.user.save()

      response.json(updatedBlog)
    }
  },
)

blogsRouter.put(
  '/:id&comment',
  middleware.verifyToken,
  middleware.userExtractor,
  async (request, response) => {

    const blog = await Blog.findById(request.params.id, 'comments').exec()
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { comments: blog.comments.concat(request.body.comment) },
      { new: true, runValidators: true, context: 'query' },
    )

    response.json(updatedBlog)
  },
)

blogsRouter.put(
  '/:id',
  middleware.verifyToken,
  middleware.userExtractor,
  async (request, response) => {
    const { title, author, url } = request.body
    const indexToUpdate = request.user.blogs.indexOf(request.params.id)

    if (indexToUpdate === -1) {
      return response.status(403).json({ error: "attempt to update another user's blog" })
    } else {
      const blog = await Blog.findById(request.params.id, 'comments').exec()
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes: blog.likes, user: blog.user, comments: blog.comments },
        { new: true, runValidators: true, context: 'query' },
      )

      response.json(updatedBlog)
    }
  },
)

module.exports = blogsRouter
