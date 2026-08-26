package com.zesk.focusflow.database.repository;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.enums.VerificationPurpose;

import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import jakarta.persistence.LockModeType;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<@NonNull VerificationCode, @NonNull Long> {
  @Lock(LockModeType.PESSIMISTIC_WRITE)
  Optional<VerificationCode> findByUserEmailAndPurpose(
    String email,
    VerificationPurpose purpose
  );

  void deleteByUserUserIdAndPurpose(
    Long userId,
    VerificationPurpose purpose
  );

  List<VerificationCode> findByExpiredAtBefore (LocalDateTime time);

  void deleteByUserUserId(Long useId);
}
