package com.zesk.focusflow.modules.tasks.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateTaskRequest {

  @NotBlank(message = "Task name is required")
  @Size(max = 100, message = "Task name must be less than 100 characters")
  private String taskName;
  
  @Size(max = 1000, message = "Description must be less than 1000 characters")
  private String description;

  private Long groupId;
}
