import type { AxiosResponse } from "axios"
type Success<T> = {
  data?: T
  code: string
  message: string
  success: true
}
export type Failure = {
  success: false
  code: string
  message: string
  errors?: []
}
export type Response<T> = Success<T> | Failure

export const getResponse = <T>(
  rawAxiosResponse: AxiosResponse<Response<T>>,
): Response<T> => {
  const backendResponse = rawAxiosResponse.data
  if (backendResponse.success) {
    return {
      success: true,
      data: backendResponse.data,
      message: backendResponse.message,
      code: backendResponse.code,
    }
  } else {
    return {
      code: backendResponse.code,
      success: false,
      errors: backendResponse.errors,
      message: backendResponse.message,
    }
  }
}
