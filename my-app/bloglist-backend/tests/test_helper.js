const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '632e05b622967305927f7e8c',
    comments: [
      'das ist fantastisch!',
      'My IQ grew bigger than 20 cm!'
    ],
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '632e05b622967305927f7e8c',
    comments: [],
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '632e05b622967305927f7e8c',
    comments: [
      'cool'
    ],
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '632e05b622967305927f7e8d',
    comments: [
      "that's what I needed so much",
      'wow',
      'total crap',
      'my momma makes betta tests'
    ],
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '632e05b622967305927f7e8d',
    comments: [],
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '632e05b622967305927f7e8e',
    comments: [],
    __v: 0,
  },
]

const initialUsers = [
  {
    _id: '632e05b622967305927f7e8c',
    username: 'Vasisualiy',
    name: 'Mikhail Dyachenko',
    //password: "IputThisEverywhere",
    passwordHash: '$2a$10$ofK5pjq4S7.Df5H4LXkVfuNpRWXG51oF4mNXI8heuthC0vTFlRbSe',
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8', '5a422b3a1b54a676234d17f9'],
    likedBlogs: [],
    __v: 0,
  },
  {
    _id: '632e05b622967305927f7e8d',
    username: 'flash_us',
    name: 'Ilja Dyachenko',
    //password: "3654theRealData2412",
    passwordHash: '$2a$10$kO1TOacajXmBd463xhyd6uxTqBayJOeOdOwRtkfzms7l2mtf6yCT.',
    blogs: ['5a422b891b54a676234d17fa', '5a422ba71b54a676234d17fb'],
    likedBlogs: [],
    __v: 0,
  },
  {
    _id: '632e05b622967305927f7e8e',
    username: 'StevieDoesntKnow',
    name: 'Steve Miller',
    //password: "AbraAbra_cadabra",
    passwordHash: '$2a$10$exzJXbj/hbO6jS.2rzkz8.Gq6.VSq6X8w7vl7C1jkTgcFOnB/7beW',
    blogs: ['5a422bc61b54a676234d17fc'],
    likedBlogs: [],
    __v: 0,
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'Vasisualiy', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initialUsers,
}
