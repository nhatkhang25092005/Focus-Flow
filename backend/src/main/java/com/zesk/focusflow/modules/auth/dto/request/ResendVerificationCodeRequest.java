package com.zesk.focusflow.modules.auth.dto.request;

import com.zesk.focusflow.enums.VerificationPurpose;
import com.zesk.focusflow.modules.auth.constants.LoginErrors;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendVerificationCodeRequest {
  @NotBlank(message = LoginErrors.EMAIL_BLANK)
  @Email(message = LoginErrors.EMAIL_FORMAT)
  private String email;

  @NotNull(message = "Verification purpose must not be null")
  private VerificationPurpose purpose;
}
