import { configureStore } from "@reduxjs/toolkit"
import { uiSlice } from "../ui/slice"
import { userSlice } from "../user/slice"

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
