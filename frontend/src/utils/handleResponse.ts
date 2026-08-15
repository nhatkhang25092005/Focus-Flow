import type { ResponseData } from "../share/types"
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
    onFailure(response)
  }
}
