import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async (filters = { keyword: '', category: '' }, thunkAPI) => {
        const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json')
        url.searchParams.set('apikey', import.meta.env.VITE_TICKETMASTER_API_KEY)
        url.searchParams.set('size', '20')
        url.searchParams.set('sort', 'date,asc')

        if (filters.keyword.trim()) {
            url.searchParams.set('keyword', filters.keyword.trim())
        }
        if (filters.category) {
            url.searchParams.set('classificationName', filters.category)
        }
        const response = await fetch(url, { signal: thunkAPI.signal })
        if (!response.ok) {
            throw new Error('Could not load events')
        }
        const data = await response.json()
        return data._embedded?.events ?? []
    },
)

export const fetchEventById = createAsyncThunk(
    'events/fetchEventById',
    async (id, thunkAPI) => {
        const url = new URL(
            `https://app.ticketmaster.com/discovery/v2/events/${encodeURIComponent(id)}.json`
        )
        url.searchParams.set('apikey', import.meta.env.VITE_TICKETMASTER_API_KEY)

        const response = await fetch(url, { signal: thunkAPI.signal })
        if (!response.ok) {
            throw new Error('Could not load event')
        }

        return response.json()
    },
)

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

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                if (action.meta.aborted) return
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchEventById.pending, (state) => {
                state.detailStatus = 'loading'
                state.selectedEvent = null
                state.error = null
            })
            .addCase(fetchEventById.fulfilled, (state, action) => {
                state.detailStatus = 'succeeded'
                state.selectedEvent = action.payload
            })
            .addCase(fetchEventById.rejected, (state, action) => {
                if (action.meta.aborted) return
                state.detailStatus = 'failed'
                state.error = action.error.message
            })
    },
})

export default events.reducer
