package com.zesk.focusflow.modules.auth.dto.request;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.zesk.focusflow.modules.auth.constants.VerifyErrors;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyAccountRequest {
  @NotBlank(message = VerifyErrors.EMAIL_BLANK)
  @Email(message = VerifyErrors.EMAIL_FORMAT)
  private String email;

  @JsonProperty("verification_code")
  @JsonAlias({"verifyCode", "verifycode", "verify_code"})
  @NotBlank(message = VerifyErrors.CODE_BLANK)
  @Size(min = 6, max = 6, message = VerifyErrors.CODE_LENGTH)
  private String verificationCode;
}
