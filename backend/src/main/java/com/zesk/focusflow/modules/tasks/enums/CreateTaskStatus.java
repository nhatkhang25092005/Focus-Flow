package com.zesk.focusflow.modules.tasks.enums;

public enum CreateTaskStatus {
  USER_NOT_FOUND("USER_NOT_FOUND", "User not found"),
  GROUP_NOT_FOUND("GROUP_NOT_FOUND", "Group not found"),
  NOT_OWNER_OF_GROUP("NOT_OWNER_OF_GROUP", "Not owner of group"),
  TASK_CREATED("TASK_CREATED", "Task created successfully");

  private final String code;
  private final String message;

  CreateTaskStatus(String code, String message) {
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
