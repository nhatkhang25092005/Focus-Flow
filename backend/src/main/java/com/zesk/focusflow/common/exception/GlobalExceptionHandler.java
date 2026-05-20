package com.zesk.focusflow.common.exception;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.zesk.focusflow.common.ApiErrorResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.bind.MethodArgumentNotValidException;
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(UnauthorizeException.class)
  public ResponseEntity<ApiErrorResponse> handleUnauthorizeException(UnauthorizeException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
      .body(new ApiErrorResponse(false, ex.getCode(), ex.getMessage(),null));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleValidationException(
    MethodArgumentNotValidException ex
  ){
    Map<String, String> errors = new LinkedHashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
      errors.put(error.getField(), error.getDefaultMessage())
    );

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(new ApiErrorResponse(false, "VALIDATION_ERROR","Validation error", errors));
  }
}
