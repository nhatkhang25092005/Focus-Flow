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

export type VerifyAccountBody = {
  email: string
  verification_code: string
}

export type ResendVerificationCodeBody = {
  email: string
  purpose: "REGISTER" | "FORGOT_PASSWORD"
}

export type ForgotPasswordBody = {
  email: string
}

export type ResetPasswordBody = {
  email: string
  new_password: string
  confirmed_password: string
  verification_code: string
}
