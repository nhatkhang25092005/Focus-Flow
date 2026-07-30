export type LoginBody = {
  email: string
  password: string
}

export type RegisterBody = {
  email: string
  password: string
  confirmedPassword: string
  gender?: "male" | "female" | "other"
  birthday?: Date
}
