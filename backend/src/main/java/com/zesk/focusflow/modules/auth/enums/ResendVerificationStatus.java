package com.zesk.focusflow.modules.auth.enums;

public enum ResendVerificationStatus {
  CODE_RESENT("VERIFICATION_CODE_RESENT", "Verification code resent successfully"),
  USER_NOT_FOUND("EMAIL_NOT_FOUND", "Email not found"),
  CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT(
    "CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT",
    "Cannot resend an account verification code for a verified account"
  ),
  RESEND_REQUEST_IS_LIMITED_BY_1M(
    "RESEND_REQUEST_IS_LIMITED_BY_1M",
    "Verification code can only be resent once per minute"
  ),
  RESEND_CODE_EXPIRED("RESEND_CODE_EXPIRED", "Verification code is missing or expired");

  private final String code;
  private final String message;

  ResendVerificationStatus(String code, String message) {
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
