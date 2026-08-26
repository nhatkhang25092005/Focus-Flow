package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.VerifyAccountRequest;
import com.zesk.focusflow.modules.auth.enums.VerifyStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class VerificationService {
  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;

  private User checkUser(VerifyAccountRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
      .orElseThrow(() -> new VerifyException(
        HttpStatus.NOT_FOUND,
        VerifyStatus.USER_NOT_FOUND.getCode(),
        VerifyStatus.USER_NOT_FOUND.getMessage()
      ));
    if (user.isVerified()) {
      throw new VerifyException(
        HttpStatus.CONFLICT,
        VerifyStatus.USER_VERIFIED_BEFORE.getCode(),
        VerifyStatus.USER_VERIFIED_BEFORE.getMessage()
      );
    }
    return user;
  }

  private VerificationCode checkVerificationCode(VerifyAccountRequest request, User user) {
    VerificationCode verificationCode = verificationCodeRepository
      .findByUserEmailAndPurpose(user.getEmail(), VerificationPurpose.REGISTER)
      .orElseThrow(() -> expiredCodeException());

    if (!verificationCode.getExpiredAt().isAfter(LocalDateTime.now())) {
      throw expiredCodeException();
    }
    if (!verificationCode.getCode().equals(request.getVerificationCode())) {
      verificationCode.setFailedAttempts(verificationCode.getFailedAttempts() + 1);
      verificationCodeRepository.save(verificationCode);
      if (verificationCode.getFailedAttempts() >= 5) {
        verificationCodeRepository.delete(verificationCode);
        userRepository.delete(user);
        throw new VerifyException(
          HttpStatus.TOO_MANY_REQUESTS,
          VerifyStatus.TOO_MANY_VERIFY_ATTEMPTS.getCode(),
          VerifyStatus.TOO_MANY_VERIFY_ATTEMPTS.getMessage()
        );
      }
      throw new VerifyException(
        HttpStatus.BAD_REQUEST,
        VerifyStatus.VERIFY_CODE_NOT_MATCHED.getCode(),
        VerifyStatus.VERIFY_CODE_NOT_MATCHED.getMessage()
      );
    }
    return verificationCode;
  }

  private VerifyException expiredCodeException() {
    return new VerifyException(
      HttpStatus.GONE,
      VerifyStatus.VERIFY_CODE_EXPIRED.getCode(),
      VerifyStatus.VERIFY_CODE_EXPIRED.getMessage()
    );
  }

  @Transactional(dontRollbackOn = VerifyException.class)
  public void verifyAccount(VerifyAccountRequest request) {
    User user = checkUser(request);
    VerificationCode verificationCode = checkVerificationCode(request, user);
    user.setVerified(true);
    userRepository.save(user);
    verificationCodeRepository.deleteById(verificationCode.getId());
  }
}
