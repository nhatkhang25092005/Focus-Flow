import { authApi } from "../../api/auth/authApi"
import type {ForgotPasswordBody, LoginBody, RegisterBody, ResendVerificationCodeBody, VerifyAccountBody, ResetPasswordBody } from "../../api/auth/types"
import { type ResponseData } from "../../share/types"
import { type UserData } from "../../share/types"
import { callApi } from "../../api/utils/callApi"

export const loginService = async (
  loginBody: LoginBody,
): Promise<ResponseData<UserData>> => await callApi(() => authApi.login(loginBody))

export const registerService = async (
  registerBody: RegisterBody,
): Promise<ResponseData<void>> => await callApi(() => authApi.register(registerBody))

export const verifyAccountService = async (
  verifyAccountBody: VerifyAccountBody
) : Promise<ResponseData<void>> => await callApi(() => authApi.verifyAccount(verifyAccountBody))

export const resendVerificationCodeService = async (
  resendVerificationCodeBody: ResendVerificationCodeBody,
): Promise<ResponseData<void>> =>
  await callApi(() => authApi.resendVerificationCode(resendVerificationCodeBody))

export const forgotPasswordRequestService = async (
  forgotPasswordRequestBody: ForgotPasswordBody 
): Promise<ResponseData<void>> => await callApi(() => authApi.forgotPassword(forgotPasswordRequestBody))

export const resetPasswordService = async (
  resetPasswordBody: ResetPasswordBody
): Promise<ResponseData<void>> => await callApi(() => authApi.resetPassword(resetPasswordBody))