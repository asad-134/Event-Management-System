import { createSlice } from '@reduxjs/toolkit'

// A saved registration is a snapshot of an event, identified by userId + eventId:
// { userId, eventId, name, date, time, venue, image, registeredAt }

const registrations = createSlice({
    name: 'registrations',
        initialState: {
            items: [],
        },
    reducers: {
        addRegistration: (state, action) => {
            const { userId, eventId } = action.payload
            const exists = state.items.some(
                (item) => item.userId === userId && item.eventId === eventId
            )
            if (exists) return

            state.items.push({
                ...action.payload,
                registeredAt: new Date().toISOString(),
            })
        },
        cancelRegistration: (state, action) => {
            const { userId, eventId } = action.payload
            state.items = state.items.filter(
                (item) => !(item.userId === userId && item.eventId === eventId)
            )
        },
    },
})

export const {addRegistration, cancelRegistration,} = registrations.actions

export default registrations.reducer
