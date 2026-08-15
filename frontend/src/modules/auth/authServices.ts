import { authApi } from "../../api/auth/authApi"
import type {LoginBody, RegisterBody } from "../../api/auth/types"
import { type ResponseData } from "../../share/types"
import { type UserData } from "../../share/types"
import { callApi } from "../../api/utils/callApi"

export const loginService = async (
  loginBody: LoginBody,
): Promise<ResponseData<UserData>> => await callApi(() => authApi.login(loginBody))

export const registerService = async (
  registerBody: RegisterBody,
): Promise<ResponseData<void>> => await callApi(() => authApi.register(registerBody))
