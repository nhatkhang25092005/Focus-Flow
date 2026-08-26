package com.zesk.focusflow.modules.auth.controller;

import com.zesk.focusflow.modules.auth.enums.RegisterStatus;
import org.jspecify.annotations.NonNull;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.zesk.focusflow.modules.auth.dto.response.LoginResponse;
import com.zesk.focusflow.modules.auth.dto.request.LoginRequest;
import com.zesk.focusflow.modules.auth.dto.request.RegisterRequest;
import com.zesk.focusflow.modules.auth.dto.request.ForgotPasswordRequest;
import com.zesk.focusflow.modules.auth.dto.request.ResetPasswordRequest;
import com.zesk.focusflow.modules.auth.dto.request.ResendVerificationCodeRequest;
import com.zesk.focusflow.modules.auth.dto.request.VerifyAccountRequest;
import com.zesk.focusflow.modules.auth.service.CookieService;
import com.zesk.focusflow.modules.auth.service.ForgotPasswordService;
import com.zesk.focusflow.modules.auth.service.ResetPasswordService;
import com.zesk.focusflow.modules.auth.service.ResentVerificationCodeService;
import com.zesk.focusflow.modules.auth.service.LoginService;
import com.zesk.focusflow.modules.auth.service.RegisterService;
import com.zesk.focusflow.modules.auth.service.VerificationService;
import com.zesk.focusflow.common.ApiResponse;
import com.zesk.focusflow.modules.auth.dto.InternalResult.LoginServiceResult;
import jakarta.servlet.http.HttpServletResponse;
import com.zesk.focusflow.modules.auth.dto.response.UserResponse;
import com.zesk.focusflow.modules.auth.enums.LoginStatus;
import com.zesk.focusflow.modules.auth.enums.ForgotPasswordStatus;
import com.zesk.focusflow.modules.auth.enums.VerifyStatus;
import com.zesk.focusflow.modules.auth.enums.ResendVerificationStatus;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final LoginService loginService;
  private final RegisterService registerService;
  private final VerificationService verificationService;
  private final ForgotPasswordService forgotPasswordService;
  private final ResetPasswordService resetPasswordService;
  private final ResentVerificationCodeService resentVerificationCodeService;
  private final CookieService cookieService;

  public AuthController(
    LoginService loginService,
    RegisterService registerService,
    VerificationService verificationService,
    ForgotPasswordService forgotPasswordService,
    ResetPasswordService resetPasswordService,
    ResentVerificationCodeService resentVerificationCodeService,
    CookieService cookieService
  ) {
    this.loginService = loginService;
    this.registerService = registerService;
    this.verificationService = verificationService;
    this.forgotPasswordService = forgotPasswordService;
    this.resetPasswordService = resetPasswordService;
    this.resentVerificationCodeService = resentVerificationCodeService;
    this.cookieService = cookieService;
  }

  @PostMapping("/login")
  public ResponseEntity<@NonNull ApiResponse<LoginResponse>> login(
    @Valid @RequestBody LoginRequest request,
    HttpServletResponse response
  ) {
    LoginServiceResult loginResult = loginService.login(request);
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
  @PostMapping("/register")
  public ResponseEntity<@NonNull ApiResponse<Void>> register(
    @Valid @RequestBody RegisterRequest request,
    HttpServletResponse response
  ){
    // register service here
    registerService.register(request);
    // create response base on the register service result
    return ResponseEntity.ok(
      new ApiResponse<>(
        true,
        RegisterStatus.REGISTER_SUCCESS.getCode(),
        RegisterStatus.REGISTER_SUCCESS.getMessage(),
        null
      )
    );
  }

  @PostMapping("/verify")
  public ResponseEntity<@NonNull ApiResponse<Void>> verifyAccount(
    @Valid @RequestBody VerifyAccountRequest request
  ) {
    verificationService.verifyAccount(request);

    return ResponseEntity.ok(
      new ApiResponse<>(
        true,
        VerifyStatus.VERIFY_SUCCESS.getCode(),
        VerifyStatus.VERIFY_SUCCESS.getMessage(),
        null
      )
    );
  }

  @PostMapping("/forgot-password-request")
  public ResponseEntity<@NonNull ApiResponse<Void>> requestForgotPassword(
    @Valid @RequestBody ForgotPasswordRequest request
  ) {
    forgotPasswordService.requestForgotPassword(request);

    return ResponseEntity.ok(
      new ApiResponse<>(
        true,
        ForgotPasswordStatus.FORGOT_PASSWORD_CODE_SENT.getCode(),
        ForgotPasswordStatus.FORGOT_PASSWORD_CODE_SENT.getMessage(),
        null
      )
    );
  }

  @PostMapping("/reset-password")
  public ResponseEntity<@NonNull ApiResponse<Void>> resetPassword(
    @Valid @RequestBody ResetPasswordRequest request
  ) {
    resetPasswordService.resetPassword(request);

    return ResponseEntity.ok(new ApiResponse<>(
      true,
      ForgotPasswordStatus.PASSWORD_CHANGED.getCode(),
      ForgotPasswordStatus.PASSWORD_CHANGED.getMessage(),
      null
    ));
  }

  @PostMapping("/resend-verification-code")
  public ResponseEntity<@NonNull ApiResponse<Void>> resendVerificationCode(
    @Valid @RequestBody ResendVerificationCodeRequest request
  ) {
    resentVerificationCodeService.resend(request);

    return ResponseEntity.ok(new ApiResponse<>(
      true,
      ResendVerificationStatus.CODE_RESENT.getCode(),
      ResendVerificationStatus.CODE_RESENT.getMessage(),
      null
    ));
  }

}
