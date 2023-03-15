const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  if (password === undefined || password.length <= 3) {
    return response.status(400).json({ error: 'password must be longer than 3 symbols' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    .exec()

  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  //<---- only for tests!
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

usersRouter.put(
  '/:id',
  middleware.verifyToken,
  middleware.userExtractor,
  async (request, response) => {
    const { username, name, password, blogs } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    if (password === undefined || password.length <= 3) {
      return response
        .status(400)
        .json({ error: 'Username and password must be longer than 3 symbols' })
    } else {
      if (request.userId !== request.params.id) {
        return response.status(401).json({ error: 'User attempts to change another users data' })
      } else {
        const saltRounds = 10
        const passwordHash = await bcryptjs.hash(password, saltRounds)

        const updatedUser = await User.findByIdAndUpdate(
          request.params.id,
          { username, name, passwordHash, blogs },
          { new: true, runValidators: true, context: 'query' },
        )

        response.json(updatedUser)
      }
    }
  },
)

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    .exec()

  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter
