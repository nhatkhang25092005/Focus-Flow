package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.RegisterException;
import com.zesk.focusflow.common.exception.UserExistedException;
import com.zesk.focusflow.common.util.CodeGenerator;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.RegisterRequest;
import com.zesk.focusflow.modules.auth.enums.RegisterStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class RegisterService {
  private final UserRepository userRepository;
  private final VerificationCodeRepository verificationCodeRepository;
  private final PasswordEncoder passwordEncoder;
  private final EmailService emailService;

  private User registerDraftUser(RegisterRequest request) {
    User user = userRepository.findByEmail(request.getEmail()).orElse(null);
    if (user != null) {
      throw user.isVerified()
        ? new UserExistedException(
          RegisterStatus.USER_ALREADY_EXISTS.getCode(),
          RegisterStatus.USER_ALREADY_EXISTS.getMessage())
        : new RegisterException(
          RegisterStatus.USER_NOT_VERIFY.getCode(),
          RegisterStatus.USER_NOT_VERIFY.getMessage());
    }

    User newUser = User.builder()
      .username(request.getUsername())
      .email(request.getEmail())
      .passwordHash(passwordEncoder.encode(request.getPassword()))
      .birthdate(request.getBirthdate())
      .build();
    userRepository.save(newUser);
    return newUser;
  }

  private void sendVerificationEmail(User user, String code) {
    VerificationCode verificationCode = new VerificationCode();
    verificationCode.setUser(user);
    verificationCode.setCode(code);
    verificationCode.setPurpose(VerificationPurpose.REGISTER);
    verificationCode.setExpiredAt(LocalDateTime.now().plusMinutes(10));
    verificationCodeRepository.save(verificationCode);
    emailService.sendVerificationCode(user.getEmail(), code, VerificationPurpose.REGISTER);
  }

  @Transactional(rollbackOn = Exception.class)
  public void register(RegisterRequest request) {
    User newUser = registerDraftUser(request);
    sendVerificationEmail(newUser, CodeGenerator.generate());
  }
}
