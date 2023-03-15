import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const initialState = { username: null, name: null, token: null, id: null }

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return { username: null, name: null, token: null, id: null }
    },
  },
})

export const { login, logout } = loginSlice.actions

export const handleLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(user))
      dispatch(showNotification(`${user.name} logged in successfully`, 'success'))
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 'error'))
    }
  }
}

export const handleLogout = (user) => {
  return async (dispatch) => {
    dispatch(showNotification(`${user.name} logged out successfully`, 'success'))
    dispatch(logout())
    window.localStorage.removeItem('loggedBlogAppUser')
  }
}

export default loginSlice.reducer