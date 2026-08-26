package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ForgotPasswordRequest;
import com.zesk.focusflow.modules.auth.enums.ForgotPasswordStatus;
import java.time.LocalDateTime;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ForgotPasswordServiceTest {
  @Mock private UserRepository userRepository;
  @Mock private VerificationCodeRepository verificationCodeRepository;
  @Mock private EmailService emailService;

  private ForgotPasswordService forgotPasswordService;
  private ForgotPasswordRequest request;

  @BeforeEach
  void setUp() {
    forgotPasswordService = new ForgotPasswordService(
      userRepository,
      verificationCodeRepository,
      emailService
    );

    request = new ForgotPasswordRequest();
    request.setEmail("test@gmail.com");
  }

  @Test
  void requestForgotPassword_createsAndEmailsCodeForVerifiedUser() {
    User user = verifiedUser();
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.empty());

    forgotPasswordService.requestForgotPassword(request);

    ArgumentCaptor<VerificationCode> captor = ArgumentCaptor.forClass(VerificationCode.class);
    verify(verificationCodeRepository).save(captor.capture());
    VerificationCode savedCode = captor.getValue();

    assertEquals(user, savedCode.getUser());
    assertEquals(VerificationPurpose.FORGOT_PASSWORD, savedCode.getPurpose());
    assertEquals(0, savedCode.getFailedAttempts());
    assertNotNull(savedCode.getCode());
    assertFalse(savedCode.getCode().isBlank());
    assertTrue(savedCode.getExpiredAt().isAfter(LocalDateTime.now().plusMinutes(9)));
    verify(emailService).sendVerificationCode(
      user.getEmail(),
      savedCode.getCode(),
      VerificationPurpose.FORGOT_PASSWORD
    );
  }

  @Test
  void requestForgotPassword_replacesExistingForgotPasswordCode() {
    User user = verifiedUser();
    VerificationCode existingCode = VerificationCode.builder()
      .id(9L)
      .user(user)
      .code("old-code")
      .purpose(VerificationPurpose.FORGOT_PASSWORD)
      .failedAttempts(4)
      .expiredAt(LocalDateTime.now().minusMinutes(1))
      .build();
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.FORGOT_PASSWORD
    )).thenReturn(Optional.of(existingCode));

    forgotPasswordService.requestForgotPassword(request);

    assertEquals(0, existingCode.getFailedAttempts());
    assertEquals(VerificationPurpose.FORGOT_PASSWORD, existingCode.getPurpose());
    assertTrue(existingCode.getExpiredAt().isAfter(LocalDateTime.now().plusMinutes(9)));
    verify(verificationCodeRepository).save(existingCode);
    verify(emailService).sendVerificationCode(
      user.getEmail(),
      existingCode.getCode(),
      VerificationPurpose.FORGOT_PASSWORD
    );
  }

  @Test
  void requestForgotPassword_rejectsMissingUserWithoutSendingEmail() {
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> forgotPasswordService.requestForgotPassword(request)
    );

    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    assertEquals(ForgotPasswordStatus.EMAIL_NOT_FOUND.getCode(), exception.getCode());
    verify(verificationCodeRepository, never()).save(org.mockito.ArgumentMatchers.any());
    verify(emailService, never()).sendVerificationCode(
      org.mockito.ArgumentMatchers.anyString(),
      org.mockito.ArgumentMatchers.anyString(),
      org.mockito.ArgumentMatchers.any()
    );
  }

  private User verifiedUser() {
    return User.builder()
      .userId(1L)
      .email(request.getEmail())
      .username("test")
      .passwordHash("hashed-password")
      .verified(true)
      .build();
  }
}
