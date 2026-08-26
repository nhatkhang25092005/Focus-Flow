package com.zesk.focusflow.modules.auth.controller;

import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.dto.request.ResendVerificationCodeRequest;
import com.zesk.focusflow.modules.auth.security.JwtAuthenticationFilter;
import com.zesk.focusflow.modules.auth.service.CookieService;
import com.zesk.focusflow.modules.auth.service.ForgotPasswordService;
import com.zesk.focusflow.modules.auth.service.LoginService;
import com.zesk.focusflow.modules.auth.service.RegisterService;
import com.zesk.focusflow.modules.auth.service.ResentVerificationCodeService;
import com.zesk.focusflow.modules.auth.service.ResetPasswordService;
import com.zesk.focusflow.modules.auth.service.VerificationService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class ResendVerificationCodeControllerTest {

  @Autowired private MockMvc mockMvc;
  @MockitoBean private LoginService loginService;
  @MockitoBean private RegisterService registerService;
  @MockitoBean private VerificationService verificationService;
  @MockitoBean private ForgotPasswordService forgotPasswordService;
  @MockitoBean private ResetPasswordService resetPasswordService;
  @MockitoBean private ResentVerificationCodeService resentVerificationCodeService;
  @MockitoBean private CookieService cookieService;
  @MockitoBean private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Test
  void tcResend007_validRequest_returnsSuccess() throws Exception {
    mockMvc.perform(post("/api/auth/resend-verification-code")
      .contentType("application/json")
      .content("""
        {
          "email": "test@gmail.com",
          "purpose": "FORGOT_PASSWORD"
        }
      """))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.success").value(true))
      .andExpect(jsonPath("$.code").value("VERIFICATION_CODE_RESENT"))
      .andExpect(jsonPath("$.message").value("Verification code resent successfully"))
      .andExpect(jsonPath("$.data").doesNotExist());

    ArgumentCaptor<ResendVerificationCodeRequest> requestCaptor =
      ArgumentCaptor.forClass(ResendVerificationCodeRequest.class);
    verify(resentVerificationCodeService).resend(requestCaptor.capture());
    assertEquals("test@gmail.com", requestCaptor.getValue().getEmail());
    assertEquals(VerificationPurpose.FORGOT_PASSWORD, requestCaptor.getValue().getPurpose());
  }

  @Test
  void tcResend008_invalidEmail_returnsValidationError() throws Exception {
    mockMvc.perform(post("/api/auth/resend-verification-code")
      .contentType("application/json")
      .content("""
        {
          "email": "invalid-email",
          "purpose": "FORGOT_PASSWORD"
        }
      """))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.success").value(false))
      .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
      .andExpect(jsonPath("$.errors.email").value("Invalid email format"));

    verify(resentVerificationCodeService, never()).resend(org.mockito.ArgumentMatchers.any());
  }

  @Test
  void tcResend009_blankEmail_returnsValidationError() throws Exception {
    mockMvc.perform(post("/api/auth/resend-verification-code")
      .contentType("application/json")
      .content("""
        {
          "email": "",
          "purpose": "REGISTER"
        }
      """))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.success").value(false))
      .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
      .andExpect(jsonPath("$.errors.email").value("Email is required"));

    verify(resentVerificationCodeService, never()).resend(org.mockito.ArgumentMatchers.any());
  }

  @Test
  void tcResend010_missingPurpose_returnsValidationError() throws Exception {
    mockMvc.perform(post("/api/auth/resend-verification-code")
      .contentType("application/json")
      .content("""
        {
          "email": "test@gmail.com"
        }
      """))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.success").value(false))
      .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
      .andExpect(jsonPath("$.errors.purpose").value("Verification purpose must not be null"));

    verify(resentVerificationCodeService, never()).resend(org.mockito.ArgumentMatchers.any());
  }
}
