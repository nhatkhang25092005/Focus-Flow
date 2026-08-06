package com.zesk.focusflow.common.exception;

public class AppException extends RuntimeException {
  private final String code;
  protected AppException(String code, String message){
    super(message);
    this.code = code;
  }

  protected String getCode() {
    return code;
  }
}
