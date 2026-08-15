export const mapResCode: Record<string, string> = {
  // map response code for auth
  AUTH_INVALID_CREDENTIALS: "auth.error.login.invalid_credentials",
  USER_NOT_VERIFY:"auth.error.register.user_not_verified",
  USER_ALREADY_EXISTS: "auth.error.register.user_already_exists",
  VALIDATION_FAILED: "auth.error.register.validation_failed",
  
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
