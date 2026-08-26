package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.common.util.CodeGenerator;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ForgotPasswordRequest;
import com.zesk.focusflow.modules.auth.enums.ForgotPasswordStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ForgotPasswordService {
  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final EmailService emailService;

  private User getVerifiedUser(ForgotPasswordRequest request) {
    // Find the user by email for send reset code
    User user =  userRepository.findByEmail(request.getEmail())
      .orElseThrow(() -> new VerifyException(
        HttpStatus.NOT_FOUND,
        ForgotPasswordStatus.EMAIL_NOT_FOUND.getCode(),
        ForgotPasswordStatus.EMAIL_NOT_FOUND.getMessage()
      ));
    
    // Throw an exception if the user is not verified
    if(!user.isVerified())
      throw new VerifyException(
        HttpStatus.NOT_ACCEPTABLE,
        ForgotPasswordStatus.USER_REQUEST_FORGOT_NOT_VERIFIED.getCode(),
        ForgotPasswordStatus.USER_REQUEST_FORGOT_NOT_VERIFIED.getMessage()
      );
        
    return user;
  }

  private void saveVerificationSession(String code, User user) {
    VerificationCode verificationCode = verificationCodeRepository
      .findByUserEmailAndPurpose(user.getEmail(), VerificationPurpose.FORGOT_PASSWORD)
      .orElseGet(VerificationCode::new);
    verificationCode.setUser(user);
    verificationCode.setCode(code);
    verificationCode.setPurpose(VerificationPurpose.FORGOT_PASSWORD);
    verificationCode.setFailedAttempts(0);
    verificationCode.setExpiredAt(LocalDateTime.now().plusMinutes(10));
    verificationCodeRepository.save(verificationCode);
  }

  @Transactional(rollbackOn = Exception.class)
  public void requestForgotPassword(ForgotPasswordRequest request) {
    User user = getVerifiedUser(request);
    String code = CodeGenerator.generate();
    saveVerificationSession(code, user);
    emailService.sendVerificationCode(user.getEmail(), code, VerificationPurpose.FORGOT_PASSWORD);
  }
}
