package com.zesk.focusflow.modules.auth.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.servlet.http.HttpServletResponse;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.zesk.focusflow.modules.auth.dto.InternalResult.LoginServiceResult;
import com.zesk.focusflow.modules.auth.dto.request.LoginRequest;
import com.zesk.focusflow.modules.auth.security.JwtAuthenticationFilter;
import com.zesk.focusflow.modules.auth.service.AuthService;
import com.zesk.focusflow.modules.auth.service.CookieService;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockitoBean
  private AuthService authService;

  @MockitoBean
  private CookieService cookieService;

  @MockitoBean
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Test
  void login_returnLoginResponse() throws Exception {
    given(authService.login(any(LoginRequest.class)))
      .willReturn(new LoginServiceResult(
        "access-token",
        "refresh-token",
        1L,
        "test",
        "test@gmail.com",
        null,
        LocalDateTime.now(),
        LocalDate.of(2012, 12, 1),
        List.of("hobby1", "hobby2")
      ));

    mockMvc.perform(post("/api/auth/login")
      .contentType("application/json")
      .content("""
        {
          "email": "test@gmail.com",
          "password": "12345678"
        }
      """))
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.message").value("Login successful"))
      .andExpect(jsonPath("$.data.access_token").value("access-token"))
      .andExpect(jsonPath("$.data.user.username").value("test"))
      .andExpect(jsonPath("$.data.user.email").value("test@gmail.com"))
      .andExpect(jsonPath("$.data.user.hobbies").isArray());

    verify(cookieService)
      .addRefreshTokenCookie(any(HttpServletResponse.class), eq("refresh-token"));
  }
}
