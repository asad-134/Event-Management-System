import { createSlice } from '@reduxjs/toolkit'

const events = createSlice({
    name: 'events',
        initialState: {
            items: [],
            selectedEvent: null,
            status: 'idle',
            detailStatus:'idle',
            error:null,
        },
    reducers: {
//add async fetching here later
    },
})

export default events.reducer
