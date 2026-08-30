package com.zesk.focusflow.modules.tasks.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.jspecify.annotations.NonNull;
import jakarta.validation.Valid;

import com.zesk.focusflow.common.ApiResponse;
import com.zesk.focusflow.modules.tasks.dto.request.CreateTaskRequest;
import com.zesk.focusflow.modules.tasks.dto.response.CreateTaskResponse;
import com.zesk.focusflow.modules.tasks.enums.CreateTaskStatus;
import com.zesk.focusflow.modules.tasks.services.CreateTaskService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {
  private final CreateTaskService createTaskService;

  @PostMapping("/create_task")
  public ResponseEntity<@NonNull ApiResponse<CreateTaskResponse>> createTask(
      @Valid @RequestBody CreateTaskRequest request) {
    String email =(String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    CreateTaskResponse response = createTaskService.createTask(request, email);
    return ResponseEntity.ok(
      new ApiResponse<CreateTaskResponse>(
        true,
        CreateTaskStatus.TASK_CREATED.getCode(),
        CreateTaskStatus.TASK_CREATED.getMessage(),
        response
      )
    );
  }
}
