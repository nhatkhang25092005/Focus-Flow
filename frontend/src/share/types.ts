/**
 * The user information in app
 */
export type UserData = {
  userId: number
  username: string
  email: string
  avatarUrl?: string
  birthdate?: string
  joinedAt?: string
  hobbies?: String[]
}

/**
 * T: Type of the response data from backend
 */
export type Success<T> = {
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
/**
 * This is the data shape in the AxiosResponse, which is sent if the backend have data to response
 * T: Type of the response data from backend
 */
export type ResponseData<T> = Success<T> | Failure
