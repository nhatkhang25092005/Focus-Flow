package com.zesk.focusflow.database.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {
  @Id
  @Column(name = "refresh_token_id",nullable=false)
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long refreshTokenId;

  @ManyToOne
  @JoinColumn(name = "user_id",nullable = false)
  private User user;

  @Column(name = "token", nullable = false, length = 255)
  private String token;

  @Column(name = "is_revoked", nullable = false)
  private Boolean isRevoked;

  @Column(name = "expires_at", nullable = false)
  private LocalDateTime expiredAt;

  public RefreshToken(
    String token,
    User user,
    LocalDateTime expiredAt
  ) {
    this.token = token;
    this.user = user;
    this.expiredAt = expiredAt;
    this.isRevoked = false;
  }

  public RefreshToken() {}

  public Long getRefreshTokenId() {
    return refreshTokenId;
  }
  
  public User getUser() {
    return user;
  }

  public String getToken() {
    return token;
  }

  public Boolean getIsRevoked() {
    return isRevoked;
  }

  public LocalDateTime getExpiredAt() {
    return expiredAt;
  }

  public void setIsRevoked(Boolean isRevoked) {
    this.isRevoked = isRevoked;
  }

  public void setExpiredAt(LocalDateTime expiredAt) {
    this.expiredAt = expiredAt;
  }

}
