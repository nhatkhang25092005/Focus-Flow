package com.zesk.focusflow.modules.auth.enums;

public enum VerifyStatus {
  VERIFY_SUCCESS("VERIFY_SUCCESS", "Account verified successfully"),
  USER_NOT_FOUND("USER_NOT_FOUND", "User not found"),
  USER_VERIFIED_BEFORE("USER_VERIFIED_BEFORE", "User has already been verified"),
  VERIFY_CODE_NOT_MATCHED("VERIFY_CODE_NOT_MATCHED", "Verification code does not match"),
  VERIFY_CODE_EXPIRED("VERIFY_CODE_EXPIRED", "Verification code has expired"),
  TOO_MANY_VERIFY_ATTEMPTS(
      "TOO_MANY_VERIFY_ATTEMPTS",
      "Too many verification attempts. Please register again");

  private final String code;
  private final String message;

  VerifyStatus(String code, String message) {
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
