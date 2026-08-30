package com.zesk.focusflow.database.entity;

import com.zesk.focusflow.enums.TaskStatus;
import java.time.LocalDateTime;
import lombok.*;

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
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

  @Builder.Default
  @Enumerated(EnumType.STRING)
  private TaskStatus status = TaskStatus.TODO;

  @Column(name = "description", nullable = true, length = 1000)
  private String description;

  @Column(name = "task_name", nullable = false, length = 100)
  private String taskName;

  @Builder.Default
  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Builder.Default
  @Column(name = "updated_at", nullable = true)
  private LocalDateTime updatedAt = null;

  @Builder.Default
  @Column(name = "done_at", nullable = true)
  private LocalDateTime doneAt = null;

  @Builder.Default
  @Column(name = "position", nullable = false)
  private Long position = 1L;

  @Builder.Default
  @Column(name = "is_pinned", nullable = false)
  private boolean isPinned = false;
}
