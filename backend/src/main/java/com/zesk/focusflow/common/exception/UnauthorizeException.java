package com.zesk.focusflow.common.exception;

public class UnauthorizeException extends RuntimeException {
  private final String code;
  public UnauthorizeException(String code, String message) {
    super(message);
    this.code = code;
  }
  
  public String getCode(){
    return code;
  }
}
