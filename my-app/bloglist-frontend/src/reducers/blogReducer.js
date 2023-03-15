import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id
      const changedBlog = action.payload
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog, username, name) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(newBlog)
      const blogToAppend = {
        ...response,
        user: {
          username,
          name,
          id: response.user,
        },
      }
      dispatch(appendBlog(blogToAppend))
      dispatch(showNotification(`a new blog with title ${newBlog.title} has been added`, 'success'))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.like(blog.id)
      const updBlogClient = {
        ...response,
        user: blog.user,
      }
      dispatch(updateBlog(updBlogClient))
      dispatch(showNotification(`You liked ${blog.title} blog!`, 'success'))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.comment(blog.id, comment)
      const updBlogClient = {
        ...response,
        user: blog.user,
      }
      dispatch(updateBlog(updBlogClient))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export const updateBlogInfo = (updBlogServer) => {
  return async (dispatch) => {
    try {
      const response = await blogService.update(updBlogServer)
      const updBlogClient = {
        ...response,
        user: updBlogServer.user,
      }
      dispatch(updateBlog(updBlogClient))
      dispatch(showNotification(`${updBlogClient.title} successfully updated`, 'success'))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export const deleteBlog = (id, title) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Delete ${title}?`)) {
        const response = await blogService.deleteRequest(id)
        if (response.status === 204) {
          const blogs = await blogService.getAll()
          dispatch(setBlogs(blogs))
          dispatch(
            showNotification(`blog ${title} was successfully deleted from server`, 'success'),
          )
        }
      }
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export default blogSlice.reducer
