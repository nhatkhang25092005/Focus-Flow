import type { AxiosError, AxiosResponse } from "axios"
import { type Failure, type ResponseData } from "../../share/types"
import { getResponse } from "./getResponse"
import axios from "axios"

const AXIOS_ERROR_MAP: Record<string, { code: string; message: string }> = {
  ECONNABORTED: { code: "TIMEOUT", message: "REQUEST_TIMEOUT" },
  ETIMEDOUT: { code: "TIMEOUT", message: "REQUEST_TIMEOUT" },
  ERR_NETWORK: { code: "NETWORK_ERROR", message: "NETWORK_ERROR" },
  ERR_CANCELED: { code: "CANCELED", message: "REQUEST_CANCELED" },
  ERR_BAD_REQUEST: { code: "BAD_REQUEST", message: "BAD_REQUEST" },
  ERR_BAD_RESPONSE: { code: "BAD_RESPONSE", message: "BAD_RESPONSE" },
  ERR_FR_TOO_MANY_REDIRECTS: {
    code: "TOO_MANY_REDIRECTS",
    message: "TOO_MANY_REDIRECTS",
  },
  ERR_BAD_OPTION: { code: "INVALID_CONFIG", message: "INVALID_CONFIG" },
  ERR_BAD_OPTION_VALUE: { code: "INVALID_CONFIG", message: "INVALID_CONFIG" },
  ERR_INVALID_URL: { code: "INVALID_CONFIG", message: "INVALID_CONFIG" },
}
const getAxiosThrow = (axiosError: AxiosError): Failure => {
  const errInfo = axiosError.code ? AXIOS_ERROR_MAP[axiosError.code] : null
  return {
    success: false,
    message: errInfo?.message ?? "SOMETHING_WENT_WRONG",
    code: errInfo?.code ?? "UNKNOWN_ERROR",
  }
}

export async function callApi<T>(
  request: () => Promise<AxiosResponse<ResponseData<T>>>,
): Promise<ResponseData<T>> {
  try {
    const response = await request()
    return getResponse(response)
  } catch (e) {
    if (axios.isAxiosError<ResponseData<T>>(e)) {
      if (e.response) {
        return getResponse(e.response)
      }
      return getAxiosThrow(e)
    }

    return {
      success: false,
      message: "SOMETHING_WENT_WRONG",
      code: "UNKNOWN_ERROR",
    }
  }
}
