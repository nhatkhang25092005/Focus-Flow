package com.zesk.focusflow.modules.auth.dto.request;

import com.zesk.focusflow.modules.auth.constance.LoginErrors;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

  @Email(message = LoginErrors.EMAIL_FORMAT)
  @NotBlank(message = LoginErrors.EMAIL_BLANK)
  private String email;

  @NotBlank(message = LoginErrors.PASSWORD_BLANK)
  @Size(min = 8, max = 64, message = LoginErrors.PASSWORD_FORMAT)
  private String password;

  public LoginRequest() {}

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
