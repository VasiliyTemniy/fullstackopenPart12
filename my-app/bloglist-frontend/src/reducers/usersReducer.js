import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { showNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    updateUser(state, action) {
      const id = action.payload.id
      const changedUser = action.payload
      return state.map((user) => (user.id !== id ? user : changedUser))
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { updateUser, appendUser, setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const createUser = (newUser) => {
  return async (dispatch) => {
    try {
      const response = await userService.create(newUser)
      dispatch(appendUser(response))
      dispatch(showNotification(`Welcome, ${newUser.name}!`, 'success'))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export const updateUserCredentials = (updUser) => {
  return async (dispatch) => {
    try {
      await userService.update(updUser)
      dispatch(updateUser(updUser))
      dispatch(showNotification(`Your credentials successfully updated`, 'success'))
    } catch (exception) {
      dispatch(showNotification(`${exception.response.data.error}`, 'error'))
    }
  }
}

export default userSlice.reducer
