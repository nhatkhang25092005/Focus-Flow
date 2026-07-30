import type { Response } from "../api/utils/getResponse"
type Props<T> = {
  response: Response<T>
  onSuccess: (data?: T) => void
  onFailure: (response?: Response<T>) => void
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
