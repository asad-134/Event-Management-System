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
    registerUser: (state,action) => {
        const {name,email,password} = action.payload;
        const trimName = name.trim();
        const normEmail = email.trim().toLowerCase();
        const emailExists = state.users.some((user) =>(user.email===normEmail));
        if(emailExists){
            state.error = 'Email already registered';
            return;
        }
        else{
            const user = {
                id: crypto.randomUUID(),
                name: trimName,
                email: normEmail,
                password,
            }
            state.users.push(user);

            state.currentUser = {
                id: user.id,
                name: user.name,
                email: user.email,
            }
            state.error = null;
        }
    },
    loginUser: (state,action) => {
        const {email,password} = action.payload;
        const normEmail = email.trim().toLowerCase();
        const user = state.users.find(
            (user) => user.email === normEmail && user.password === password
        );

        if (!user) {
            state.error = 'Invalid email or password';
            state.currentUser = null;
            return;
        }

        state.currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        state.error = null;
    },
    logoutUser: (state) => {
        state.currentUser = null;
        state.error = null;
    },
    clearAuthError: (state) => {
        state.error = null;
    },
  },
})

export const {registerUser, loginUser, logoutUser, clearAuthError} = authSlice.actions

export default authSlice.reducer
