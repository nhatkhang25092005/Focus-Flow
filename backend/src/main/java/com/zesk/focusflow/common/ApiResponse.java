package com.zesk.focusflow.common;

public record ApiResponse<T>(
  Boolean success,
  String code,
  String message,
  T data
){}
