package com.zesk.focusflow.database.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "task_groups")
public class TaskGroup {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "group_id", nullable = false)
  private Long groupId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "group_name", nullable = false, length = 100)
  private String groupName;

  @Column(name = "is_pinned", nullable = false)
  private Boolean isPinned = false;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = true)
  private LocalDateTime updatedAt = null;

  @Column(name = "position", nullable = false)
  private Long position = 1L;
  
  public TaskGroup() {}
}
