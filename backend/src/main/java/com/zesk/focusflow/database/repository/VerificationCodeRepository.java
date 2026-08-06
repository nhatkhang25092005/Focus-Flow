package com.zesk.focusflow.database.repository;

import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface VerificationCodeRepository extends JpaRepository<@NonNull VerificationCode, @NonNull String> {
  Optional<VerificationCode> findByUserEmail(String email);

  List<VerificationCode> findByExpiredAtBefore (LocalDateTime time);

  void deleteByUserUserId(Long useId);
}
