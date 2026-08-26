import type { AxiosResponse } from "axios"
import api from "../axiosClient"
// import { type LoginResponse } from "../../modules/auth/types"
import type { LoginBody, RegisterBody, ResendVerificationCodeBody, VerifyAccountBody, ForgotPasswordBody, ResetPasswordBody } from "./types"
import type { ResponseData, UserData } from "../../share/types"
export const authApi = {
  login: async (body: LoginBody): Promise<AxiosResponse<ResponseData<UserData>>> => {
    return await api.post("/auth/login", body)
  },

  register: async (body: RegisterBody): Promise<AxiosResponse<ResponseData<void>>> => {
    return await api.post("/auth/register", body)
  },

  verifyAccount: async (body: VerifyAccountBody): Promise<AxiosResponse<ResponseData<void>>> => {
    return await api.post("/auth/verify", body)
  },

  resendVerificationCode: async (body: ResendVerificationCodeBody): Promise<AxiosResponse<ResponseData<void>>> => {
    return await api.post("/auth/resend-verification-code", body)
  },

  forgotPassword: async (body: ForgotPasswordBody): Promise<AxiosResponse<ResponseData<void>>> => {
    return await api.post("/auth/forgot-password-request", body)
  },

  resetPassword: async (body: ResetPasswordBody): Promise<AxiosResponse<ResponseData<void>>> => {
    return await api.post("/auth/reset-password", body)
  }


}
