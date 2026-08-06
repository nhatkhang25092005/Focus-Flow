package com.zesk.focusflow.common.exception;

public class  UserExistedException extends AppException{
  public UserExistedException(String code, String message){
    super(code, message);
  }
}
