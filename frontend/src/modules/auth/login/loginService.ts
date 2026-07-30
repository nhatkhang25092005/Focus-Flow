import { authApi } from "../../../api/auth/authApi"
import type { LoginBody } from "../../../api/auth/types"
import { type Response } from "../../../api/utils/getResponse"
import { type UserData } from "../../../share/types"
import { callApi } from "../../../api/utils/callApi"

export const loginService = async (
  loginBody: LoginBody,
): Promise<Response<UserData>> => await callApi(() => authApi.login(loginBody))
