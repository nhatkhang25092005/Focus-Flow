package com.zesk.focusflow.database.entity;

import java.time.LocalDateTime;

import com.zesk.focusflow.enums.PomodoroStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "pomodoro_sessions")
public class PomodoroSession {
  @Id
  @Column(name = "pomodoro_id", nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long pomodoroId;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(name = "started_at", nullable = false)
  private LocalDateTime startedAt = LocalDateTime.now();

  @Column(name = "ended_at", nullable = true)
  private LocalDateTime endedAt = null;

  @Column(name = "duration_seconds", nullable = false)
  private Long durationInSeconds = 0L;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false)
  private PomodoroStatus status = PomodoroStatus.RUNNING;

  @Column(name = "created_at", nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = true)
  private LocalDateTime updatedAt = null;

  public PomodoroSession() {}
}
