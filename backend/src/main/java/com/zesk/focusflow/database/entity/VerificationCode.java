package com.zesk.focusflow.database.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "verification_code")
public class VerificationCode {
  @Id
  @GeneratedValue(strategy =GenerationType.IDENTITY)
  private Long id;

  @Column(name = "code", nullable = false, length = 8)
  private String code;

  @Column(name = "expired_at", nullable = false)
  private LocalDateTime expiredAt;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false)
  private LocalDateTime createAt;

  @OneToOne
  @JoinColumn(name = "userId", nullable = false)
  private User user;


  public VerificationCode(){}

  public String getCode() {
    return code;
  }

  public Long getId() {
    return id;
  }

  public LocalDateTime getExpired_at() {
    return expiredAt;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public void setExpiredAt(LocalDateTime expiredAt) {
    this.expiredAt = expiredAt;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
