import { createSlice } from '@reduxjs/toolkit'

const registrations = createSlice({
    name: 'registration',
        initialState: {
            items: [],
        },
    reducers: {
        addRegistration: () => {},
        cancelRegistration: () => {},
    },
})

export const {addRegistration, cancelRegistration,} = registrations.actions

export default registrations.reducer