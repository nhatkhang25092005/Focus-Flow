import type { AxiosResponse } from "axios"
import api from "../axiosClient"
// import { type LoginResponse } from "../../modules/auth/types"
import type { LoginBody, RegisterBody } from "./types"
import type { ResponseData, UserData } from "../../share/types"
export const authApi = {
  login: async (body: LoginBody): Promise<AxiosResponse<ResponseData<UserData>>> => {
    return await api.post("/auth/login", body)
  },

  register: async (body: RegisterBody): Promise<AxiosResponse<ResponseData<void>>> => {
    return await api.post("/auth/register", body)
  }
}
