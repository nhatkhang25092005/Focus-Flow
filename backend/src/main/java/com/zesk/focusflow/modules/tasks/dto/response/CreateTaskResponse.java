package com.zesk.focusflow.modules.tasks.dto.response;

import com.zesk.focusflow.database.entity.Task;
import com.zesk.focusflow.enums.TaskStatus;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateTaskResponse {
  private Long taskId;
  private String taskName;
  private String description;
  private TaskStatus status;
  private Long groupId;
  private Long position;
  private boolean isPinned;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private LocalDateTime doneAt;

  public static CreateTaskResponse fromEntity(Task task) {
    return CreateTaskResponse.builder()
        .taskId(task.getTaskId())
        .taskName(task.getTaskName())
        .description(task.getDescription())
        .status(task.getStatus())
        .groupId(task.getGroup() != null ? task.getGroup().getGroupId() : null)
        .position(task.getPosition())
        .isPinned(task.isPinned())
        .createdAt(task.getCreatedAt())
        .updatedAt(task.getUpdatedAt())
        .doneAt(task.getDoneAt())
        .build();
  }
}
