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
  private final VerificationCodeRepository verificationCodeRepository;
  private final UserRepository userRepository;
  @Scheduled(fixedRate = 600000L)
  public void cleanUpExpiredVerifyUser(){
    List<VerificationCode> expiredList = verificationCodeRepository.findByExpiredAtBefore(LocalDateTime.now());
    List<User> expiredUsers = expiredList.stream()
      .map(code -> code.getUser())
      .filter(user -> !user.isVerified())
      .distinct()
      .toList();
    verificationCodeRepository.deleteAll(expiredList);
    verificationCodeRepository.flush();
    userRepository.deleteAll(expiredUsers);
  }
}
