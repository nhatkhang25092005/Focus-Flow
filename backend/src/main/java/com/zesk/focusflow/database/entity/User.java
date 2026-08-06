package com.zesk.focusflow.database.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;


import java.time.LocalDateTime;
import java.time.LocalDate;
import jakarta.persistence.Column;
import lombok.*;

@Builder
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long userId;

  @Column(name = "username", nullable = false, length = 100)
  private String username;

  @Column(name = "password_hash", nullable = false, length = 255)
  private String passwordHash;

  @Column(name = "avatar_url", nullable = true, length = 500)
  private String avatarUrl;

  @Builder.Default
  @Column(name = "joined_at", nullable = false)
  private LocalDateTime joinedAt = LocalDateTime.now();

  @Column(name = "email", nullable = false, length = 255, unique = true)
  private String email;

  @Column(name = "birthdate")
  private LocalDate birthdate = null;

  @Builder.Default
  @Column(name = "verified", nullable = false)
  private boolean verified = false;


//  public boolean getVerified(){return verified;}
//
//  public String getPasswordHash() {
//    return passwordHash;
//  }
//
//  public Long getUserId() {
//    return userId;
//  }
//
//  public String getUsername() {
//    return username;
//  }
//
//  public String getAvatarUrl() {
//    return avatarUrl;
//  }
//
//  public LocalDateTime getJoinedAt() {
//    return joinedAt;
//  }
//
//  public String getEmail() {
//    return email;
//  }
//
//  public LocalDate getBirthdate(){
//    return birthdate;
//  }
//
//  public void setEmail(String email) {
//    this.email = email;
//  }
//
//  public boolean isVerified() {
//    return verified;
//  }
//
//  public void setPasswordHash(String passwordHash) {
//    this.passwordHash = passwordHash;
//  }
//
//  public void setUsername(String username) {
//    this.username = username;
//  }
}
