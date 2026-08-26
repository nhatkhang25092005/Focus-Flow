package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.common.util.CodeGenerator;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ResendVerificationCodeRequest;
import com.zesk.focusflow.modules.auth.enums.ResendVerificationStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ResentVerificationCodeService {
  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final EmailService emailService;

  @Transactional(dontRollbackOn = VerifyException.class)
  public void resend(ResendVerificationCodeRequest request) {
    User user = findEligibleUser(request);
    VerificationCode verificationCode = verificationCodeRepository
      .findByUserEmailAndPurpose(request.getEmail(), request.getPurpose())
      .orElseThrow(this::expiredCodeException);

    LocalDateTime now = LocalDateTime.now();
    if (verificationCode.getCreateAt().isAfter(now.minusMinutes(1))) {
      throw new VerifyException(
        HttpStatus.TOO_MANY_REQUESTS,
        ResendVerificationStatus.RESEND_REQUEST_IS_LIMITED_BY_1M.getCode(),
        ResendVerificationStatus.RESEND_REQUEST_IS_LIMITED_BY_1M.getMessage()
      );
    }

    if (!verificationCode.getExpiredAt().isAfter(now)) {
      verificationCodeRepository.delete(verificationCode);
      throw expiredCodeException();
    }

    String code = CodeGenerator.generate();
    verificationCode.setCode(code);
    verificationCode.setCreateAt(now);
    verificationCode.setFailedAttempts(0);
    verificationCodeRepository.save(verificationCode);
    emailService.sendVerificationCode(user.getEmail(), code, request.getPurpose());
  }

  private User findEligibleUser(ResendVerificationCodeRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
      .orElseThrow(this::userNotFoundException);

    if (request.getPurpose() == VerificationPurpose.REGISTER && user.isVerified()) {
      throw new VerifyException(
        HttpStatus.CONFLICT,
        ResendVerificationStatus.CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT.getCode(),
        ResendVerificationStatus.CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT.getMessage()
      );
    }

    if (request.getPurpose() == VerificationPurpose.FORGOT_PASSWORD && !user.isVerified()) {
      throw userNotFoundException();
    }
    return user;
  }

  private VerifyException userNotFoundException() {
    return new VerifyException(
      HttpStatus.NOT_FOUND,
      ResendVerificationStatus.USER_NOT_FOUND.getCode(),
      ResendVerificationStatus.USER_NOT_FOUND.getMessage()
    );
  }

  private VerifyException expiredCodeException() {
    return new VerifyException(
      HttpStatus.GONE,
      ResendVerificationStatus.RESEND_CODE_EXPIRED.getCode(),
      ResendVerificationStatus.RESEND_CODE_EXPIRED.getMessage()
    );
  }
}
