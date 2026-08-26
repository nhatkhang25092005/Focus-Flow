package com.zesk.focusflow.modules.auth.controller;

import com.zesk.focusflow.modules.auth.dto.request.ForgotPasswordRequest;
import com.zesk.focusflow.modules.auth.security.JwtAuthenticationFilter;
import com.zesk.focusflow.modules.auth.service.CookieService;
import com.zesk.focusflow.modules.auth.service.ForgotPasswordService;
import com.zesk.focusflow.modules.auth.service.ResetPasswordService;
import com.zesk.focusflow.modules.auth.service.ResentVerificationCodeService;
import com.zesk.focusflow.modules.auth.service.LoginService;
import com.zesk.focusflow.modules.auth.service.RegisterService;
import com.zesk.focusflow.modules.auth.service.VerificationService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.never;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class ForgotPasswordControllerTest {
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
  void requestForgotPassword_returnsSuccess() throws Exception {
    mockMvc.perform(post("/api/auth/forgot-password-request")
      .contentType("application/json")
      .content("""
        {
          "email": "test@gmail.com"
        }
      """))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.success").value(true))
      .andExpect(jsonPath("$.code").value("FORGOT_PASSWORD_CODE_SENT"))
      .andExpect(jsonPath("$.message").value("Reset password code sent successfully"))
      .andExpect(jsonPath("$.data").doesNotExist());

    verify(forgotPasswordService).requestForgotPassword(any(ForgotPasswordRequest.class));
  }

  @Test
  void requestForgotPassword_rejectsInvalidEmail() throws Exception {
    mockMvc.perform(post("/api/auth/forgot-password-request")
      .contentType("application/json")
      .content("""
        {
          "email": "invalid-email"
        }
      """))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
      .andExpect(jsonPath("$.errors.email").value("Invalid email format"));
  }

  @Test
  void resetPassword_changesPassword() throws Exception {
    mockMvc.perform(post("/api/auth/reset-password")
      .contentType("application/json")
      .content("""
        {
          "email": "test@gmail.com",
          "password": "new-password",
          "confirmed_password": "new-password",
          "verification_code": "123456"
        }
      """))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.success").value(true))
      .andExpect(jsonPath("$.code").value("PASSWORD_CHANGED"));

    verify(resetPasswordService).resetPassword(any());
  }

  @Test
  void resetPassword_rejectsMismatchedPasswords() throws Exception {
    mockMvc.perform(post("/api/auth/reset-password")
      .contentType("application/json")
      .content("""
        {
          "email": "test@gmail.com",
          "password": "new-password",
          "confirmed_password": "different-password",
          "verification_code": "123456"
        }
      """))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"));

    verify(resetPasswordService, never()).resetPassword(any());
  }

}
