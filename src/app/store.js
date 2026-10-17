import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import eventsReducer from '../features/events/eventsSlice.js'
import registrationsReducer from '../features/registrations/registrationsSlice.js'

const STORAGE_KEY = 'eventDemoData'

function loadSavedState() {
  if (typeof window === 'undefined') return undefined

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if(!saved){
       return undefined
    }
    const parsed = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return undefined
    }

    const state = {}
    if(parsed.auth){
       state.auth = parsed.auth
    }
    if(parsed.registrations){
       state.registrations = parsed.registrations
    }
    return Object.keys(state).length > 0 ? state : undefined
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
  preloadedState: loadSavedState(),
})

store.subscribe(() => {
  if (typeof window === 'undefined') return

  try {
    const { auth, registrations } = store.getState()
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ auth, registrations }),
    )
  } catch {
  }
})
