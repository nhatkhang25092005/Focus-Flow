package com.zesk.focusflow.modules.auth.enums;

public enum LoginStatus {

  LOGIN_SUCCESS(
    "AUTH_LOGIN_SUCCESS",
    "Login successful"
  ),

  INVALID_CREDENTIALS(
    "AUTH_INVALID_CREDENTIALS",
    "Email or password is invalid"
  ),

  LOGIN_FAIL(
    "AUTH_LOGIN_FAIL",
    "Login failed"
  ),

  LOGIN_VALIDATION_ERROR(
    "AUTH_LOGIN_VALIDATION_ERROR",
    "Login validation failed"
  );

  private final String code;
  private final String message;

  LoginStatus(String code, String message) {
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