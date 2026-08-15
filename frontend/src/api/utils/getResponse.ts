import type { AxiosResponse } from "axios"
import {type ResponseData} from '../../share/types'

export const getResponse = <T>(
  rawAxiosResponse: AxiosResponse<ResponseData<T>>,
): ResponseData<T> => {
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
