package com.zesk.focusflow.modules.tasks.services;

import com.zesk.focusflow.common.exception.TaskException;
import com.zesk.focusflow.database.entity.Task;
import com.zesk.focusflow.database.entity.TaskGroup;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.repository.TaskGroupRepository;
import com.zesk.focusflow.database.repository.TaskRepository;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.modules.tasks.dto.request.CreateTaskRequest;
import com.zesk.focusflow.modules.tasks.dto.response.CreateTaskResponse;
import com.zesk.focusflow.modules.tasks.enums.CreateTaskStatus;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateTaskService {

  private final TaskRepository taskRepository;
  private final TaskGroupRepository taskGroupRepository;
  private final UserRepository userRepository;

  private TaskException taskException(){
    return new TaskException(
      HttpStatus.NOT_FOUND,
      CreateTaskStatus.USER_NOT_FOUND.getCode(),
      CreateTaskStatus.USER_NOT_FOUND.getMessage()
    );
  }

  private TaskException groupException(){
    return new TaskException(
      HttpStatus.NOT_FOUND,
      CreateTaskStatus.GROUP_NOT_FOUND.getCode(),
      CreateTaskStatus.GROUP_NOT_FOUND.getMessage()
    );
  }

  private TaskException notOwnerOfGroupException(){
    return new TaskException(
      HttpStatus.FORBIDDEN,
      CreateTaskStatus.NOT_OWNER_OF_GROUP.getCode(),
      CreateTaskStatus.NOT_OWNER_OF_GROUP.getMessage()
    );
  }

  private Task newTaskEntity(CreateTaskRequest request, User user, TaskGroup taskGroup){
    Long position = taskGroup != null
      ? taskRepository.findMaxPositionByGroup(user.getUserId(), taskGroup.getGroupId()) + 1L
      : taskRepository.findMaxPositionNoGroup(user.getUserId()) + 1L;

    return Task.builder()
      .taskName(request.getTaskName())
      .position(position)
      .group(taskGroup)
      .description(request.getDescription())
      .user(user)
      .build();
  }

  @Transactional
  public CreateTaskResponse createTask(CreateTaskRequest request, String email) {
    User user = userRepository.findByEmail(email)
    .orElseThrow(() -> taskException());
    TaskGroup taskGroup = null;

    if(request.getGroupId() != null){
      taskGroup = taskGroupRepository.findById(request.getGroupId())
        .orElseThrow(() -> groupException());

      if(!taskGroup.getUser().getUserId().equals(user.getUserId()))
        throw notOwnerOfGroupException(); 
    }

    Task task = newTaskEntity(request, user, taskGroup);
    taskRepository.save(task);
    return CreateTaskResponse.fromEntity(task);
  }
}
