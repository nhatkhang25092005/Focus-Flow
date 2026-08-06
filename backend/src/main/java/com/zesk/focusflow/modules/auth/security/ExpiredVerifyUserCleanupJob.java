package com.zesk.focusflow.modules.auth.security;

import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Component
public class ExpiredVerifyUserCleanupJob {
  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;

  // TODO: Need to refactor about algorithm
  @Scheduled(fixedRate = 600000L)
  public void cleanUpExpiredVerifyUser(){
    List<VerificationCode> expiredList = verificationCodeRepository.findByExpiredAtBefore(LocalDateTime.now());
    for (VerificationCode expiredItem : expiredList) {
      User user = expiredItem.getUser();
      verificationCodeRepository.deleteByUserUserId(user.getUserId());
      userRepository.deleteByUserId(user.getUserId());
    }
  }
}
