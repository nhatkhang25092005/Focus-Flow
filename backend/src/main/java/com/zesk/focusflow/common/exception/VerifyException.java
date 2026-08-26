package com.zesk.focusflow.common.exception;

import org.springframework.http.HttpStatus;

public class VerifyException extends AppException {
  private final HttpStatus status;

  public VerifyException(HttpStatus status, String code, String message) {
    super(code, message);
    this.status = status;
  }

  public HttpStatus getStatus() {
    return status;
  }

  @Override
  public String getCode() {
    return super.getCode();
  }
}
