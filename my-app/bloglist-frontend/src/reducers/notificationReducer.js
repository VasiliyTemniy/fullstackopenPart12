import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: 'success', timeoutId: 0 }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.timeoutId)
      return action.payload
    },
    removeMessage() {
      return { message: '', type: 'success', timeoutId: 0 }
    },
  },
})

export const { setNotification, removeMessage } = notificationSlice.actions

export const showNotification = (message, type) => {
  return (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
    dispatch(setNotification({ message, type, timeoutId }))
  }
}

export default notificationSlice.reducer
