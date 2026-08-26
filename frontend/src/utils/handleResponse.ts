import type { ResponseData } from "../share/types"
import { normalizeBackendCode } from "../api/code"

type Props<T> = {
  response: ResponseData<T>
  onSuccess: (data?: T) => void
  onFailure: (response?: ResponseData<T>) => void
}

export function handleResponse<T>({
  response,
  onSuccess,
  onFailure,
}: Props<T>) {
  if (response.success == true) {
    onSuccess(response.data)
  } else {
    onFailure({
      ...response,
      code: normalizeBackendCode(response.code),
    })
  }
}
