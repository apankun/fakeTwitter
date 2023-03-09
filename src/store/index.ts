import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './modules/user'
import { twiSlice } from './modules/post'
export const store = configureStore({
  reducer: {
    userState: userSlice.reducer,
    twiState: twiSlice.reducer
  }
})

export type Dispatch = typeof store.dispatch
export type State = ReturnType<typeof store.getState>
