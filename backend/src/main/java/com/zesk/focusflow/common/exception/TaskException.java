package com.zesk.focusflow.common.exception;

import org.springframework.http.HttpStatus;

public class TaskException extends AppException {
    private final HttpStatus status;

    public TaskException(HttpStatus status, String code, String message) {
        super(code, message);
        this.status = status;
    }
    
    public HttpStatus getStatus() {
        return status;
    }
}
