package com.zesk.focusflow.modules.auth.security;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import com.zesk.focusflow.database.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class RefreshTokenCleanupJob {
  private final RefreshTokenRepository refreshTokenRepository;
  @Scheduled(fixedRate = 86400000L) // Run every day (86400000 ms = 24 hours)
  public void cleanUpExpiredTokens() {
    refreshTokenRepository.deleteByExpiredAtBefore(LocalDateTime.now());
  }
}
