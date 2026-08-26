export const getMessageFromCode: Record<string, string> = {
  // map response code for auth
  AUTH_INVALID_CREDENTIALS: "auth.error.login.invalid_credentials",
  USER_NOT_VERIFY:"auth.error.register.user_not_verified",
  USER_NOT_VERIFIED:"auth.error.register.user_not_verified",
  USER_ALREADY_EXISTS: "auth.error.register.user_already_exists",
  VALIDATION_FAILED: "auth.error.register.validation_failed",
  USER_NOT_FOUND: "auth.error.verify.user_not_found",
  USER_VERIFIED_BEFORE: "auth.error.verify.user_verified_before",
  VERIFY_CODE_NOT_MATCHED: "auth.error.verify.code_not_matched",
  VERIFY_CODE_EXPIRED: "auth.error.verify.code_expired",
  TOO_MANY_VERIFY_ATTEMPTS: "auth.error.verify.too_many_attempts",
  EMAIL_NOT_FOUND: "auth.error.verify.resend_email_not_found",
  CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT: "auth.error.verify.resend_verified_account",
  RESEND_REQUEST_IS_LIMITED_BY_1M: "auth.error.verify.resend_rate_limited",
  RESEND_CODE_EXPIRED: "auth.error.verify.resend_code_expired",
  NOT_VERIFIED:"auth.error.login.not_verified",


  // map error response code
  TIMEOUT: "axios.REQUEST_TIMEOUT",
  NETWORK_ERROR: "axios.NETWORK_ERROR",
  CANCELED: "axios.CANCELED",
  BAD_REQUEST: "axios.BAD_REQUEST",
  BAD_RESPONSE: "axios.BAD_RESPONSE",
  TOO_MANY_REDIRECTS: "axios.TOO_MANY_REDIRECTS",
  INVALID_CONFIG: "axios.INVALID_CONFIG",
  UNKNOWN_ERROR: "axios.UNKNOWN_ERROR",
}
