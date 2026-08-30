package com.zesk.focusflow.common.exception;
import java.util.LinkedHashMap;
import java.util.Map;

import org.jspecify.annotations.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.zesk.focusflow.common.ApiErrorResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.bind.MethodArgumentNotValidException;
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(VerifyException.class)
  public ResponseEntity<@NonNull ApiErrorResponse> handleVerifyException(VerifyException ex) {
    return ResponseEntity.status(ex.getStatus())
      .body(new ApiErrorResponse(false, ex.getCode(), ex.getMessage(), null));
  }

  @ExceptionHandler(UnauthorizeException.class)
  public ResponseEntity<@NonNull ApiErrorResponse> handleUnauthorizeException(UnauthorizeException ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
      .body(new ApiErrorResponse(false, ex.getCode(), ex.getMessage(),null));
  }

  @ExceptionHandler(UserExistedException.class)
  public ResponseEntity<@NonNull ApiErrorResponse> handleUserExistedException(UserExistedException ex){
    return ResponseEntity.status(HttpStatus.CONFLICT)
      .body(new ApiErrorResponse(false, ex.getCode(), ex.getMessage(), null));
  }

  @ExceptionHandler(RegisterException.class)
  public ResponseEntity<@NonNull ApiErrorResponse> handleUserVerifiedException(RegisterException ex){
    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
      .body(new ApiErrorResponse(false, ex.getCode(), ex.getMessage(), null));
  }

  @ExceptionHandler(TaskException.class)
  public ResponseEntity<@NonNull ApiErrorResponse> handleTaskException(TaskException ex){
    return ResponseEntity.status(ex.getStatus())
      .body(new ApiErrorResponse(false, ex.getCode(), ex.getMessage(), null));
  }

  // Validation Failed
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<@NonNull ApiErrorResponse> handleValidationException(
    MethodArgumentNotValidException ex
  ){
    Map<String, String> errors = new LinkedHashMap<>();
    ex.getBindingResult().getFieldErrors().forEach(error ->
      errors.put(error.getField(), error.getDefaultMessage())
    );

    return ResponseEntity
      .status(HttpStatus.BAD_REQUEST)
      .body(new ApiErrorResponse(false, "VALIDATION_FAILED","Validation error", errors));
  }
}
