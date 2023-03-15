const groupBy = require('lodash/groupBy')
const maxBy = require('lodash/maxby')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {
      title: '',
      author: '',
      likes: 0,
    }
  } else {
    const indexOfFavorite = blogs.reduce(
      (iMax, item, index, array) => (item.likes > array[iMax].likes ? index : iMax),
      0,
    )
    return {
      title: blogs[indexOfFavorite].title,
      author: blogs[indexOfFavorite].author,
      likes: blogs[indexOfFavorite].likes,
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      blogs: 0,
    }
  } else {
    const arrayLength = (array) => array.length
    const authors = blogs.map((blog) => blog.author)
    const mostBlogsAuthorArray = maxBy(Object.values(groupBy(authors)), arrayLength)
    return {
      author: mostBlogsAuthorArray[0],
      blogs: mostBlogsAuthorArray.length,
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: '',
      likes: 0,
    }
  } else {
    const likesSum = (array) => array.reduce((sum, item) => sum + item.likes, 0)
    const authorsNLikes = blogs.map((blog) => {
      return {
        author: blog.author,
        likes: blog.likes,
      }
    })
    const mostLikesAuthorArray = maxBy(
      Object.values(groupBy(authorsNLikes, (item) => item.author)),
      likesSum,
    )
    return {
      author: mostLikesAuthorArray[0].author,
      likes: likesSum(mostLikesAuthorArray),
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
