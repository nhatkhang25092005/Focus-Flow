package com.zesk.focusflow.database.entity;

import com.zesk.focusflow.enums.VerificationPurpose;
import jakarta.persistence.*;
import lombok.Builder;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import lombok.*;

@Builder
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(
  name = "verification_code",
  uniqueConstraints = {
    @UniqueConstraint(
      name = "uk_verification_code_user_purpose",
      columnNames = {"userId", "purpose"}
    )
  }
)
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

  @Builder.Default
  @Column(name = "failed_attempts", nullable = false)
  private int failedAttempts = 0;

  @Enumerated(EnumType.STRING)
  @Builder.Default
  @Column(name = "purpose", nullable = false, length = 32)
  private VerificationPurpose purpose = VerificationPurpose.REGISTER;

  @ManyToOne
  @JoinColumn(name = "userId", nullable = false)
  private User user;
}