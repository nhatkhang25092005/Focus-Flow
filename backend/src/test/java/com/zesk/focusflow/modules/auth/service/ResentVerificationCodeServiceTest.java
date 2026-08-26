package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ResendVerificationCodeRequest;
import com.zesk.focusflow.modules.auth.enums.ResendVerificationStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ResentVerificationCodeServiceTest {
  @Mock private UserRepository userRepository;
  @Mock private VerificationCodeRepository verificationCodeRepository;
  @Mock private EmailService emailService;

  private ResentVerificationCodeService service;
  private ResendVerificationCodeRequest request;

  @BeforeEach
  void setUp() {
    service = new ResentVerificationCodeService(
      userRepository,
      verificationCodeRepository,
      emailService
    );
    request = new ResendVerificationCodeRequest();
    request.setEmail("test@gmail.com");
  }

  @Test
  void resend_rotatesRegisterCodeForUnverifiedUser() {
    request.setPurpose(VerificationPurpose.REGISTER);
    User user = user(false);
    VerificationCode code = code(user, VerificationPurpose.REGISTER, 2);
    LocalDateTime originalExpiry = code.getExpiredAt();
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    )).thenReturn(Optional.of(code));

    service.resend(request);

    assertEquals(0, code.getFailedAttempts());
    assertTrue(code.getCreateAt().isAfter(LocalDateTime.now().minusSeconds(5)));
    assertEquals(originalExpiry, code.getExpiredAt());
    verify(verificationCodeRepository).save(code);
    verify(emailService).sendVerificationCode(
      request.getEmail(), code.getCode(), VerificationPurpose.REGISTER
    );
  }

  @Test
  void resend_rejectsRegisterCodeForVerifiedUser() {
    request.setPurpose(VerificationPurpose.REGISTER);
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user(true)));

    VerifyException exception = assertThrows(VerifyException.class, () -> service.resend(request));

    assertEquals(HttpStatus.CONFLICT, exception.getStatus());
    assertEquals(
      ResendVerificationStatus.CAN_NOT_RESEND_CODE_FOR_VERIFIED_ACCOUNT.getCode(),
      exception.getCode()
    );
    verify(verificationCodeRepository, never()).findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    );
  }

  @Test
  void resend_rejectsRequestWithinOneMinute() {
    request.setPurpose(VerificationPurpose.REGISTER);
    User user = user(false);
    VerificationCode code = code(user, request.getPurpose(), 0);
    code.setCreateAt(LocalDateTime.now().minusSeconds(30));
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    )).thenReturn(Optional.of(code));

    VerifyException exception = assertThrows(VerifyException.class, () -> service.resend(request));

    assertEquals(HttpStatus.TOO_MANY_REQUESTS, exception.getStatus());
    assertEquals(
      ResendVerificationStatus.RESEND_REQUEST_IS_LIMITED_BY_1M.getCode(),
      exception.getCode()
    );
    verify(verificationCodeRepository, never()).save(code);
    verify(emailService, never()).sendVerificationCode(anyString(), anyString(), org.mockito.ArgumentMatchers.any());
  }

  @Test
  void resend_rejectsAndDeletesExpiredCode() {
    request.setPurpose(VerificationPurpose.FORGOT_PASSWORD);
    User user = user(true);
    VerificationCode code = code(user, request.getPurpose(), 0);
    code.setExpiredAt(LocalDateTime.now().minusSeconds(1));
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    )).thenReturn(Optional.of(code));

    VerifyException exception = assertThrows(VerifyException.class, () -> service.resend(request));

    assertEquals(HttpStatus.GONE, exception.getStatus());
    assertEquals(ResendVerificationStatus.RESEND_CODE_EXPIRED.getCode(), exception.getCode());
    verify(verificationCodeRepository).delete(code);
    verify(emailService, never()).sendVerificationCode(anyString(), anyString(), org.mockito.ArgumentMatchers.any());
  }

  @Test
  void resend_rejectsMissingCodeAsExpired() {
    request.setPurpose(VerificationPurpose.FORGOT_PASSWORD);
    User user = user(true);
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    )).thenReturn(Optional.empty());

    VerifyException exception = assertThrows(VerifyException.class, () -> service.resend(request));

    assertEquals(HttpStatus.GONE, exception.getStatus());
    assertEquals(ResendVerificationStatus.RESEND_CODE_EXPIRED.getCode(), exception.getCode());
    verify(emailService, never()).sendVerificationCode(anyString(), anyString(), org.mockito.ArgumentMatchers.any());
  }

  @Test
  void resend_rotatesForgotPasswordCodeForVerifiedUser() {
    request.setPurpose(VerificationPurpose.FORGOT_PASSWORD);
    User user = user(true);
    VerificationCode code = code(user, request.getPurpose(), 4);
    LocalDateTime originalExpiry = code.getExpiredAt();
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    )).thenReturn(Optional.of(code));

    service.resend(request);

    assertEquals(0, code.getFailedAttempts());
    assertEquals(originalExpiry, code.getExpiredAt());
    verify(verificationCodeRepository).save(code);
    verify(emailService).sendVerificationCode(
      request.getEmail(), code.getCode(), VerificationPurpose.FORGOT_PASSWORD
    );
  }

  @Test
  void resend_rejectsForgotPasswordForUnverifiedUser() {
    request.setPurpose(VerificationPurpose.FORGOT_PASSWORD);
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user(false)));

    VerifyException exception = assertThrows(VerifyException.class, () -> service.resend(request));

    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    assertEquals(ResendVerificationStatus.USER_NOT_FOUND.getCode(), exception.getCode());
    verify(verificationCodeRepository, never()).findByUserEmailAndPurpose(
      request.getEmail(), request.getPurpose()
    );
  }

  private User user(boolean verified) {
    return User.builder().userId(1L).email(request.getEmail()).verified(verified).build();
  }

  private VerificationCode code(User user, VerificationPurpose purpose, int attempts) {
    return VerificationCode.builder()
      .id(10L)
      .user(user)
      .code("old-code")
      .purpose(purpose)
      .failedAttempts(attempts)
      .createAt(LocalDateTime.now().minusMinutes(2))
      .expiredAt(LocalDateTime.now().plusMinutes(5))
      .build();
  }
}
