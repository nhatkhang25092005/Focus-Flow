package com.zesk.focusflow.database.entity;

import com.zesk.focusflow.enums.TaskStatus;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "tasks")
public class Task {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long taskId;

  @ManyToOne
  @JoinColumn(name = "group_id", nullable = true)
  private TaskGroup group;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Enumerated(EnumType.STRING)
  private TaskStatus status = TaskStatus.TODO;

  @Column(name = "description", nullable = true, length = 1000)
  private String description;

  @Column(name = "task_name", nullable = false, length = 100)
  private String taskName;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = true)
  private LocalDateTime updatedAt = null;

  @Column(name = "done_at", nullable = true)
  private LocalDateTime doneAt = null;

  @Column(name = "position", nullable = false)
  private Long position = 1L;

  @Column(name = "is_pinned", nullable = false)
  private boolean isPinned = false;

  public Task() {}


}
