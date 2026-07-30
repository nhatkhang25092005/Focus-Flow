import type { UserData } from "../share/types"
import {
  setUser,
  updateUser,
  clearUser,
} from "./slice"
import { store } from "../app/store"

export const userService = {
  setUser: (userData: UserData) => {
    store.dispatch(setUser(userData))
  },
  updateUser:(fields:Partial<UserData>) => {
    store.dispatch(updateUser(fields))
  },
  clearUser: () => {
    store.dispatch(clearUser())
  },
}
