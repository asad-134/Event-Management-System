import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  currentUser: null,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: () => {},
    loginUser: () => {},
    logoutUser: () => {},
    clearAuthError: () => {},
  },
})

export const {registerUser, loginUser, logoutUser, clearAuthError} = authSlice.actions

export default authSlice.reducer