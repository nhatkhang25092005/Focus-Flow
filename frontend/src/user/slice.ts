import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type UserData } from "../share/types"

const initialUserState: UserData = {
  userId: 0,
  email:"",
  username: "",
  avatarUrl: undefined,
  birthdate: undefined,
  joinedAt: undefined,
  hobbies: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (_, action: PayloadAction<UserData>) => {
      return action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      return { ...state, ...action }
    },
    clearUser: () => {
      return initialUserState
    },
  },
})

export const {
  setUser,
  updateUser,
  clearUser,
} = userSlice.actions

export default userSlice.reducer