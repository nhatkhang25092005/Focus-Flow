package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ResetPasswordRequest;
import com.zesk.focusflow.modules.auth.enums.ForgotPasswordStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResetPasswordServiceTest {
  @Mock private UserRepository userRepository;
  @Mock private VerificationCodeRepository verificationCodeRepository;
  @Mock private PasswordEncoder passwordEncoder;

  private ResetPasswordService service;
  private ResetPasswordRequest request;
  private User user;

  @BeforeEach
  void setUp() {
    service = new ResetPasswordService(
      userRepository,
      verificationCodeRepository,
      passwordEncoder
    );
    request = new ResetPasswordRequest();
    request.setEmail("test@gmail.com");
    request.setNewPassword("new-password");
    request.setConfirmedPassword("new-password");
    request.setVerificationCode("123456");
    user = User.builder().userId(1L).email(request.getEmail()).passwordHash("old-hash").build();
  }

  @Test
  void changePassword_hashesPasswordAndConsumesCode() {
    VerificationCode code = verificationCode("123456", 0, LocalDateTime.now().plusMinutes(5));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.of(code));
    when(passwordEncoder.encode(request.getNewPassword())).thenReturn("new-hash");

    service.resetPassword(request);

    assertEquals("new-hash", user.getPasswordHash());
    verify(userRepository).save(user);
    verify(verificationCodeRepository).delete(code);
  }

  @Test
  void changePassword_incrementsInvalidAttemptWithoutChangingPassword() {
    VerificationCode code = verificationCode("654321", 3, LocalDateTime.now().plusMinutes(5));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.of(code));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> service.resetPassword(request)
    );

    assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    assertEquals(ForgotPasswordStatus.VERIFY_CODE_NOT_MATCHED.getCode(), exception.getCode());
    assertEquals(4, code.getFailedAttempts());
    verify(verificationCodeRepository).save(code);
    verify(verificationCodeRepository, never()).delete(code);
    verify(userRepository, never()).save(user);
  }

  @Test
  void changePassword_deletesCodeOnFifthInvalidAttempt() {
    VerificationCode code = verificationCode("654321", 4, LocalDateTime.now().plusMinutes(5));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.of(code));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> service.resetPassword(request)
    );

    assertEquals(HttpStatus.TOO_MANY_REQUESTS, exception.getStatus());
    assertEquals(ForgotPasswordStatus.TOO_MANY_VERIFY_ATTEMPTS.getCode(), exception.getCode());
    assertEquals(5, code.getFailedAttempts());
    verify(verificationCodeRepository).delete(code);
    verify(verificationCodeRepository, never()).save(code);
    verify(userRepository, never()).save(user);
  }

  @Test
  void changePassword_rejectsAndDeletesExpiredCode() {
    VerificationCode code = verificationCode("123456", 0, LocalDateTime.now().minusSeconds(1));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.of(code));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> service.resetPassword(request)
    );

    assertEquals(HttpStatus.GONE, exception.getStatus());
    verify(verificationCodeRepository).delete(code);
    verify(userRepository, never()).save(user);
  }

  @Test
  void changePassword_rejectsMissingCode() {
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.empty());

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> service.resetPassword(request)
    );

    assertEquals(HttpStatus.GONE, exception.getStatus());
    verify(userRepository, never()).save(user);
  }

  private VerificationCode verificationCode(String value, int attempts, LocalDateTime expiry) {
    return VerificationCode.builder()
      .id(10L)
      .user(user)
      .code(value)
      .purpose(VerificationPurpose.FORGOT_PASSWORD)
      .failedAttempts(attempts)
      .expiredAt(expiry)
      .build();
  }
}
