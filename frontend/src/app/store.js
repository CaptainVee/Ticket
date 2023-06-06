import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from '../features/tickets/ticketSlice'
import authReducer from '../features/auth/authSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
})