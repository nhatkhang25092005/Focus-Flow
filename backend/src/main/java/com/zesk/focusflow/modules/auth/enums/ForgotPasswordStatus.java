package com.zesk.focusflow.modules.auth.enums;

public enum ForgotPasswordStatus {
  FORGOT_PASSWORD_CODE_SENT(
    "FORGOT_PASSWORD_CODE_SENT",
    "Reset password code sent successfully"
  ),
  EMAIL_NOT_FOUND(
    "EMAIL_NOT_FOUND",
    "Email not found"
  ),
  VERIFY_CODE_EXPIRED(
    "FORGOT_PASSWORD_VERIFY_CODE_EXPIRED",
    "Reset password code is missing or expired"
  ),
  VERIFY_CODE_NOT_MATCHED(
    "FORGOT_PASSWORD_VERIFY_CODE_NOT_MATCHED",
    "Reset password code is invalid"
  ),
  TOO_MANY_VERIFY_ATTEMPTS(
    "FORGOT_PASSWORD_TOO_MANY_VERIFY_ATTEMPTS",
    "Too many invalid reset password attempts"
  ),
  PASSWORD_CHANGED(
    "PASSWORD_CHANGED",
    "Password changed successfully"
  ),
  USER_REQUEST_FORGOT_NOT_VERIFIED(
    "USER_REQUEST_FORGOT_NOT_VERIFIED",
    "User request forgot password is not verified"
  );

  private final String code;
  private final String message;

  ForgotPasswordStatus(String code, String message) {
    this.code = code;
    this.message = message;
  }

  public String getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }
}
