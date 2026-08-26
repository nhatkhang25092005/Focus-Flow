package com.zesk.focusflow.modules.auth.service;

import com.zesk.focusflow.common.exception.VerifyException;
import com.zesk.focusflow.database.entity.User;
import com.zesk.focusflow.database.entity.VerificationCode;
import com.zesk.focusflow.database.repository.UserRepository;
import com.zesk.focusflow.database.repository.VerificationCodeRepository;
import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.VerifyAccountRequest;
import com.zesk.focusflow.modules.auth.enums.VerifyStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class VerificationServiceTest {
  @Mock private UserRepository userRepository;
  @Mock private VerificationCodeRepository verificationCodeRepository;
  private VerificationService verificationService;
  private VerifyAccountRequest request;

  @BeforeEach
  void setUp() {
    verificationService = new VerificationService(
      userRepository,
      verificationCodeRepository
    );

    request = new VerifyAccountRequest();
    request.setEmail("test@gmail.com");
    request.setVerificationCode("123456");
  }

  @Test
  void verifyAccount_marksUserVerifiedAndConsumesCode() {
    User user = unverifiedUser();
    VerificationCode verificationCode = verificationCode(user, "123456", LocalDateTime.now().plusMinutes(5));
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.REGISTER
    ))
      .thenReturn(Optional.of(verificationCode));

    verificationService.verifyAccount(request);

    assertTrue(user.isVerified());
    verify(userRepository).save(user);
    verify(verificationCodeRepository).deleteById(99L);
  }

  @Test
  void verifyAccount_rejectsUnknownUser() {
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> verificationService.verifyAccount(request)
    );

    assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    assertEquals(VerifyStatus.USER_NOT_FOUND.getCode(), exception.getCode());
  }

  @Test
  void verifyAccount_rejectsAlreadyVerifiedUser() {
    User user = unverifiedUser();
    user.setVerified(true);
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> verificationService.verifyAccount(request)
    );

    assertEquals(HttpStatus.CONFLICT, exception.getStatus());
    assertEquals(VerifyStatus.USER_VERIFIED_BEFORE.getCode(), exception.getCode());
    verify(verificationCodeRepository, never()).findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.REGISTER
    );
  }

  @Test
  void verifyAccount_rejectsMissingOrExpiredCode() {
    User user = unverifiedUser();
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.REGISTER
    )).thenReturn(Optional.empty());

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> verificationService.verifyAccount(request)
    );

    assertEquals(HttpStatus.GONE, exception.getStatus());
    assertEquals(VerifyStatus.VERIFY_CODE_EXPIRED.getCode(), exception.getCode());
  }

  @Test
  void verifyAccount_rejectsCodeThatIsStillStoredAfterExpiry() {
    User user = unverifiedUser();
    VerificationCode verificationCode = verificationCode(user, "123456", LocalDateTime.now().minusSeconds(1));
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.REGISTER
    ))
      .thenReturn(Optional.of(verificationCode));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> verificationService.verifyAccount(request)
    );

    assertEquals(HttpStatus.GONE, exception.getStatus());
    assertEquals(VerifyStatus.VERIFY_CODE_EXPIRED.getCode(), exception.getCode());
    verify(userRepository, never()).save(user);
    verify(verificationCodeRepository, never()).deleteById(verificationCode.getId());
  }

  @Test
  void verifyAccount_rejectsMismatchedCode() {
    User user = unverifiedUser();
    VerificationCode verificationCode = verificationCode(user, "654321", LocalDateTime.now().plusMinutes(5));
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.REGISTER
    ))
      .thenReturn(Optional.of(verificationCode));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> verificationService.verifyAccount(request)
    );

    assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    assertEquals(VerifyStatus.VERIFY_CODE_NOT_MATCHED.getCode(), exception.getCode());
    assertEquals(1, verificationCode.getFailedAttempts());
    verify(verificationCodeRepository).save(verificationCode);
    verify(userRepository, never()).save(user);
    verify(verificationCodeRepository, never()).delete(verificationCode);
  }

  @Test
  void verifyAccount_rejectsAndDeletesDraftOnFifthFailedAttempt() {
    User user = unverifiedUser();
    VerificationCode verificationCode = verificationCode(user, "654321", LocalDateTime.now().plusMinutes(5));
    verificationCode.setFailedAttempts(4);
    when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
    when(verificationCodeRepository.findByUserEmailAndPurpose(
      request.getEmail(),
      VerificationPurpose.REGISTER
    )).thenReturn(Optional.of(verificationCode));

    VerifyException exception = assertThrows(
      VerifyException.class,
      () -> verificationService.verifyAccount(request)
    );

    assertEquals(HttpStatus.TOO_MANY_REQUESTS, exception.getStatus());
    assertEquals(VerifyStatus.TOO_MANY_VERIFY_ATTEMPTS.getCode(), exception.getCode());
    assertEquals(5, verificationCode.getFailedAttempts());
    verify(verificationCodeRepository).save(verificationCode);
    verify(verificationCodeRepository).delete(verificationCode);
    verify(userRepository).delete(user);
    verify(userRepository, never()).save(user);
  }

  private User unverifiedUser() {
    return User.builder()
      .userId(1L)
      .email(request.getEmail())
      .username("test")
      .passwordHash("hashed-password")
      .verified(false)
      .build();
  }

  private VerificationCode verificationCode(User user, String code, LocalDateTime expiredAt) {
    VerificationCode verificationCode = new VerificationCode();
    ReflectionTestUtils.setField(verificationCode, "id", 99L);
    verificationCode.setUser(user);
    verificationCode.setCode(code);
    verificationCode.setExpiredAt(expiredAt);
    verificationCode.setPurpose(VerificationPurpose.REGISTER);
    return verificationCode;
  }
}
