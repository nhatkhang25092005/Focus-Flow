import type { AxiosResponse } from "axios"
import api from "../axiosClient"
import { type LoginResponse } from "../../modules/auth//login/types"
import type { LoginBody, RegisterBody } from "./types"
export const authApi = {
  login: async (body: LoginBody): Promise<AxiosResponse<LoginResponse>> => {
    return await api.post("/auth/login", body)
  },

  register: async (body: RegisterBody): Promise<AxiosResponse<any>> => {
    return await api.post("/auth/register", body)
  }
}
