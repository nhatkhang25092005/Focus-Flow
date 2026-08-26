package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.UserExistedException;
import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ResetPasswordRequest;
import com.zesk.focusflow.modules.auth.enums.ForgotPasswordStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ResetPasswordService {
  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final PasswordEncoder passwordEncoder;

  @Transactional(dontRollbackOn = VerifyException.class)
  public void resetPassword(ResetPasswordRequest request) {
    User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
      this::userExistedException
    );

    VerificationCode verificationCode = verificationCodeRepository
      .findByUserEmailAndPurpose(request.getEmail(), VerificationPurpose.FORGOT_PASSWORD)
      .orElseThrow(this::expiredCodeException);

    if (!verificationCode.getExpiredAt().isAfter(LocalDateTime.now())) {
      verificationCodeRepository.delete(verificationCode);
      throw expiredCodeException();
    }

    if (!verificationCode.getCode().equals(request.getVerificationCode())) {
      handleInvalidCode(verificationCode);
    }
    
    user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
    userRepository.save(user);
    verificationCodeRepository.delete(verificationCode);
  }

  private void handleInvalidCode(VerificationCode verificationCode) {
    int failedAttempts = verificationCode.getFailedAttempts() + 1;
    verificationCode.setFailedAttempts(failedAttempts);

    if (failedAttempts >= 5) {
      verificationCodeRepository.delete(verificationCode);
      throw new VerifyException(
        HttpStatus.TOO_MANY_REQUESTS,
        ForgotPasswordStatus.TOO_MANY_VERIFY_ATTEMPTS.getCode(),
        ForgotPasswordStatus.TOO_MANY_VERIFY_ATTEMPTS.getMessage()
      );
    }

    verificationCodeRepository.save(verificationCode);
    throw new VerifyException(
      HttpStatus.BAD_REQUEST,
      ForgotPasswordStatus.VERIFY_CODE_NOT_MATCHED.getCode(),
      ForgotPasswordStatus.VERIFY_CODE_NOT_MATCHED.getMessage()
    );
  }

  private VerifyException expiredCodeException() {
    return new VerifyException(
      HttpStatus.GONE,
      ForgotPasswordStatus.VERIFY_CODE_EXPIRED.getCode(),
      ForgotPasswordStatus.VERIFY_CODE_EXPIRED.getMessage()
    );
  }

  private UserExistedException userExistedException(){
    return new UserExistedException(
      ForgotPasswordStatus.EMAIL_NOT_FOUND.getCode(),
      ForgotPasswordStatus.EMAIL_NOT_FOUND.getMessage()
    );
  }

}
