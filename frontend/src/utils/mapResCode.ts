export const mapResCode: Record<string, string> = {
  // map response code for auth
  AUTH_INVALID_CREDENTIALS: "auth.error.login.invalid_credentials",

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
