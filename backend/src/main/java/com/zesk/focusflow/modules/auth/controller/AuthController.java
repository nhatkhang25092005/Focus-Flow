package com.zesk.focusflow.modules.auth.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.zesk.focusflow.modules.auth.dto.response.LoginResponse;
import com.zesk.focusflow.modules.auth.dto.request.LoginRequest;
import com.zesk.focusflow.modules.auth.service.AuthService;
import com.zesk.focusflow.modules.auth.service.CookieService;
import com.zesk.focusflow.common.ApiResponse;
import com.zesk.focusflow.modules.auth.dto.InternalResult.LoginServiceResult;
import jakarta.servlet.http.HttpServletResponse;
import com.zesk.focusflow.modules.auth.dto.response.UserResponse;
import com.zesk.focusflow.modules.auth.enums.LoginStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;
  private final CookieService cookieService;
  
  public AuthController(
    AuthService authService,
    CookieService cookieService
  ) {
    this.authService = authService;
    this.cookieService = cookieService;
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<LoginResponse>> login(
    @Valid @RequestBody LoginRequest request,
    HttpServletResponse response
  ) {
    LoginServiceResult loginResult = authService.login(request);
    cookieService.addRefreshTokenCookie(response, loginResult.refreshToken());
    
    LoginResponse loginResponse = new LoginResponse(
      loginResult.accessToken(),
      new UserResponse(
        loginResult.userId(),
        loginResult.username(),
        loginResult.email(),
        loginResult.profilePictureUrl(),
        loginResult.birthdate(),
        loginResult.joinedAt(),
        loginResult.hobbies()
      )
    );

    return ResponseEntity.ok(
      new ApiResponse<>(
        true,
        LoginStatus.LOGIN_SUCCESS.getCode(),
        LoginStatus.LOGIN_SUCCESS.getMessage(),
        loginResponse
      )
    );
  }
}
