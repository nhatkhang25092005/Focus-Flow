package com.zesk.focusflow.modules.auth.enums;

public enum RegisterStatus {
  USER_ALREADY_EXISTS(
    "USER_ALREADY_EXISTS",
    "User already exists"
  ),

  USER_NOT_VERIFY(
    "USER_NOT_VERIFY",
    "User already register but still haven't verify"
  ),
  REGISTER_SUCCESS(
    "REGISTER_SUCCESS",
    "Register successfully"
  ),
  SENT_VERIFIED(
    "SENT_VERIFY",
    "This email has been sent code to verify"
  ),
  EXPIRED(
    "EXPIRED",
    "The verification code is expired"
  );
  private final String code;
  private final String message;

  RegisterStatus(String code, String message) {
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
