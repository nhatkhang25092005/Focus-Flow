package com.zesk.focusflow.modules.auth.dto.request;

import com.zesk.focusflow.modules.auth.constants.LoginErrors;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordRequest {
  @NotBlank(message = LoginErrors.EMAIL_BLANK)
  @Email(message = LoginErrors.EMAIL_FORMAT)
  private String email;
}
