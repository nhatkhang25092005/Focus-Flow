package com.zesk.focusflow.database.repository;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.zesk.focusflow.database.entity.RefreshToken;

import java.time.LocalDateTime;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<@NonNull RefreshToken,@NonNull Long> {
  Optional<RefreshToken> findByToken(String token);

  @Transactional
  void deleteByExpiredAtBefore(LocalDateTime now);

  @Transactional
  void deleteByUserUserId(Long userId);
}
